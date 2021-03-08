import { getCsrfFromCookie } from "../utils/helpers";

const TINTRACK_API_URL = "http://192.168.1.15:8000";
const ENDPOINT = {
	hello: "/hello",
	register: "/auth/register",
	login: "/api/login",
	logout: "/api/logout",
	me: "/api/me",
	habits: "/api/habits",
	tasks: "/api/tasks",
	schedules: "/api/schedules",
	habitCounters: "/api/habit-counters",
	plannedTasks: "/api/planned-tasks"
};
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiIsUp: false,
			authAlert: {
				title: "",
				variant: ""
			},
			authLoading: true,
			me: {
				name: "",
				email: "",
				memberSince: null,
				ranking: "",
				isAuthenticated: false
			},
			currentDate: {
				year: null,
				month: null,
				day: null
			},
			dashboardDay: {
				year: "",
				month: "",
				day: "",
				dayName: "",
				weekNumber: "",
				plannedTasks: [],
				habitCounters: []
			},
			routine: {
				tasks: [],
				habits: []
			},
			iconsInventory: {
				taskIcons: [
					"default-task",
					"smoking",
					"bed-making",
					"water-glass",
					"weights"
				],
				habitIcons: [
					"default-habit",
					"smoking",
					"bed-making",
					"water-glass",
					"weights"
				],
				feelingIcons: [
					"sadder",
					"sad",
					"indifferent",
					"happy",
					"happier"
				]
			},
			demo: [
				{
					title: "First",
					background: "white",
					initial: "white"
				},
				{
					title: "Second",
					background: "black",
					initial: "black"
				}
			]
		},
		actions: {
			createAuthAlert: (title, variant) => {
				setStore({
					authAlert: {
						title,
						variant
					}
				});
			},
			dismissAuthAlert: () => {
				setStore({
					authAlert: {
						title: "",
						variant: ""
					}
				});
			},
			setAuthLoading: loading => {
				setStore({
					authLoading: loading
				});
			},
			setMeEmail: email => {
				const store = getStore();
				setStore({
					me: {
						...store.me,
						email
					}
				});
			},
			fetchLogUserOut: async () => {
				let url = TINTRACK_API_URL + ENDPOINT.logout;
				const store = getStore();
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "POST",
					credentials: "include",
					body: {}
				});
				if (response.ok) {
					console.log("user successfully logged out");
					setStore({
						me: {
							name: "",
							email: "",
							membersSince: null,
							ranking: "",
							isAuthenticated: false
						}
					});
					return true;
				} else {
					console.log("something failed logging out");
					return false;
				}
			},
			fetchMeData: async () => {
				let url = TINTRACK_API_URL + ENDPOINT.me;
				let meObject = null;
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET",
					credentials: "include"
				});
				if (response.ok) {
					meObject = await response.json();
					setStore({
						me: meObject
					});
					return true;
				} else {
					console.log(
						"could not get me information because: ",
						response
					);
					return false;
				}
			},
			fetchLogUserIn: async creds => {
				// log user in and, if response is ok, store
				// string on cookie for future fetch headers
				// and return success...
				// if log in unsuccessfull, return !success...
				let url = TINTRACK_API_URL + ENDPOINT.login;
				const actions = getActions();
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "POST",
					credentials: "include",
					body: JSON.stringify(creds)
				});
				if (response.ok) {
					// login was successfull, cookies must be on browser
					// by now. try to get me data from me endpoint
					return actions.fetchMeData();
				} else {
					// login was unsuccessfull for many causes, all
					// resume on same alert, invalid creds..
					console.log("invalid creds..");
					return false;
				}
			},
			getCurrentDateObj: () => {
				let currentDate = new Date();
				let currentDateObj = {
					year: currentDate.getFullYear(),
					month: currentDate.getMonth(),
					day: currentDate.getDate()
				};
				setStore({
					currentDate: currentDateObj
				});
			},
			getScheduleForDate: async dateObject => {
				// console.log("taking call to get schedule day", dateObject);
				let url = TINTRACK_API_URL + ENDPOINT.schedules;
				let monthString = month => {
					if (month < 10) {
						return "0" + month.toString();
					} else {
						return month.toString();
					}
				};
				let dayString = day => {
					if (day < 10) {
						return "0" + day.toString();
					} else {
						return day.toString();
					}
				};
				let dateString =
					dateObject.year +
					"-" +
					monthString(dateObject.month) +
					"-" +
					dayString(dateObject.day);
				url += "/" + dateString;
				// get UTC diff to send in url
				let today = new Date(Date.now());
				let UTCDiff = today.getTimezoneOffset() / 60;
				if (UTCDiff >= 0) {
					// positive diff is earlier times, time behind
					// time behind is hours less, send negative UTCDiff
					url += "/-" + UTCDiff;
				} else {
					url += "/" + UTCDiff;
				}
				// console.log("this is url to fetch: ", url);
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET",
					credentials: "include"
				});
				if (response.ok) {
					// console.log("received dashboardDay? ", response.status);
					let dashboardDay = await response.json();
					// console.log(dashboardDay);
					setStore({
						dashboardDay
					});
					return true;
				} else {
					console.log("something failed with fetch");
					console.log(response.status);
					return false;
				}
			},
			fetchCheckApi: async () => {
				let url = TINTRACK_API_URL + ENDPOINT.hello;
				let response = null;
				try {
					response = await fetch(url, {
						headers: {
							"Content-Type": "application/json"
						},
						method: "GET"
					});
				} catch {
					console.log("api is not up...");
					return false;
				}
				if (response.ok) {
					setStore({
						apiIsUp: true
					});
					return true;
				} else {
					console.log(
						"failure on api check, status code: ",
						response.status
					);
					setStore({
						apiIsUp: false
					});
					return false;
				}
			},
			fetchRegisterUser: async (requestBody, setLoading) => {
				console.log("registering user");
				let url = TINTRACK_API_URL + ENDPOINT.register;
				let result = false;
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "POST",
					body: JSON.stringify(requestBody)
				});
				if (response.ok) {
					result = true;
				} else {
					console.log("response is not ok: ", response.statusText);
				}
				return result;
			},
			fetchCreateTask: async newTask => {
				const store = getStore();
				let url = TINTRACK_API_URL + ENDPOINT.tasks;
				let csrfToken = getCsrfFromCookie("csrf_access_token");
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken
					},
					method: "POST",
					credentials: "include",
					body: JSON.stringify(newTask)
				});
				if (response.ok) {
					return true;
				} else {
					let error = await response.json();
					console.log(error);
					console.log("something went wrong creating task...");
					return false;
				}
			},
			fetchCreateHabit: async newHabit => {
				console.log("this is newHabit: ", JSON.stringify(newHabit));
				let url = TINTRACK_API_URL + ENDPOINT.habits;
				let csrfToken = getCsrfFromCookie("csrf_access_token");
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken
					},
					method: "POST",
					credentials: "include",
					body: JSON.stringify(newHabit)
				});
				if (response.ok) {
					return true;
				} else {
					let error = await response.json();
					console.log(error);
					console.log("something wrong creating habit...");
					console.log(response.status);
					return false;
				}
			},
			fetchGetTask: async taskId => {
				let url = TINTRACK_API_URL + ENDPOINT.tasks;
				url += "/" + taskId;
				console.log("fetching to get task");
				let response = await fetch(url, {
					headers: {
						"Content-Type": "applications/json"
					},
					method: "GET",
					credentials: "include"
				});
				let task = {};
				if (response.ok) {
					task = await response.json();
					return task;
				} else {
					console.log("problem fetching task");
					return null;
				}
			},
			fetchGetHabit: async habitId => {
				let url = TINTRACK_API_URL + ENDPOINT.habits;
				url += "/" + habitId;
				let response = await fetch(url, {
					headers: {
						"Content-Type": "applications/json"
					},
					method: "GET",
					credentials: "include"
				});
				let habit = {};
				if (response.ok) {
					habit = await response.json();
					return habit;
				} else {
					console.log("problem fetching habit...");
					return null;
				}
			},
			fetchEditTask: async (updatedTask, taskId) => {
				let url = TINTRACK_API_URL + ENDPOINT.tasks;
				url += "/" + taskId;
				let csrfToken = getCsrfFromCookie("csrf_access_token");
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken
					},
					method: "PUT",
					credentials: "include",
					body: JSON.stringify(updatedTask)
				});
				if (response.ok) {
					return true;
				} else {
					console.log("problems updating task");
					return false;
				}
			},
			fetchEditHabit: async (updatedHabit, habitId) => {
				let url = TINTRACK_API_URL + ENDPOINT.habits;
				url += "/" + habitId;
				let csrfToken = getCsrfFromCookie("csrf_access_token");
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken
					},
					method: "PUT",
					credentials: "include",
					body: JSON.stringify(updatedHabit)
				});
				if (response.ok) {
					return true;
				} else {
					let error = await response.json();
					console.log(error);
					console.log("problem updating habit...");
					return false;
				}
			},
			fetchDeleteRoutineItem: async (isHabit, itemId) => {
				let url = TINTRACK_API_URL;
				if (isHabit) {
					// delete on habit endpoint
					url += ENDPOINT.habits;
				} else {
					// delete on task endpoint
					url += ENDPOINT.tasks;
				}
				url += "/" + itemId;
				let csrfToken = getCsrfFromCookie("csrf_access_token");
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken
					},
					method: "DELETE",
					credentials: "include"
				});
				if (response.ok) {
					return true;
				} else {
					let error = await response.json();
					console.log("something wrong deleting item: ", error);
					return false;
				}
			},
			fetchGetTasks: async () => {
				// fetchs to api to get user tasks, returns
				// object with success: true/false and
				// tasks: [tasks]
				let tasksUrl = TINTRACK_API_URL + ENDPOINT.tasks;
				let response = await fetch(tasksUrl, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET",
					credentials: "include"
				});
				if (response.ok) {
					let tasks = await response.json();
					return {
						success: true,
						tasks
					};
				} else {
					console.log("something went wrong loading tasks...");
					return {
						success: false,
						tasks: []
					};
				}
			},
			fetchGetHabits: async () => {
				// fetchs to api to get user habits, returns
				// object with success: true/false and
				// habits: [habits]
				let habitsUrl = TINTRACK_API_URL + ENDPOINT.habits;
				let response = await fetch(habitsUrl, {
					headers: {
						"Content-Type": "application/json"
					},
					method: "GET",
					credentials: "include"
				});
				if (response.ok) {
					let habits = await response.json();
					return {
						success: true,
						habits
					};
				} else {
					console.log("something went wrong while loading habits...");
					return {
						success: false,
						habits: []
					};
				}
			},
			fetchGetRoutine: async () => {
				// gets tasks and habits for a user, sets store
				// and returns true/false on success/!successfull
				const actions = getActions();
				let tasks = await actions.fetchGetTasks();
				let habits = await actions.fetchGetHabits();
				if (tasks.success && habits.success) {
					setStore({
						routine: {
							tasks: tasks.tasks,
							habits: habits.habits
						}
					});
					return true;
				} else {
					return false;
				}
			},
			fetchAddOccurrence: async (introspective, itemId, counter) => {
				let url = TINTRACK_API_URL;
				if (counter) {
					url += ENDPOINT.habitCounters + "/" + itemId;
				} else {
					url += ENDPOINT.plannedTasks + "/" + itemId;
				}
				let csrfToken = getCsrfFromCookie("csrf_access_token");
				console.log(JSON.stringify(introspective));
				let response = await fetch(url, {
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken
					},
					method: "POST",
					body: JSON.stringify(introspective),
					credentials: "include"
				});
				if (response.ok) {
					return true;
				} else {
					let error = await response.json();
					console.log(error);
					console.log("something wrong adding occurrence");
					return false;
				}
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				// fetch some data and update state
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((element, i) => {
					if (i === index) element.background = color;
					return element;
				});
				setStore({
					demo: demo
				});
			}
		}
	};
};

export default getState;
