import fetch from 'isomorphic-fetch'

export const CLICK_TAB = 'CLICK_TAB'
export const REQUEST_TOPICS = 'REQUEST_TOPICS'
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'
export const CLICK_TOPIC = 'CLICK_TOPIC'
export const REQUEST_TOPIC_DETAIL = 'REQUEST_TOPIC_DETAIL'
export const RECEIVE_TOPIC_DETAIL = 'RECEIVE_TOPIC_DETAIL'
export const CLICK_USER_AVATAR = 'CLICK_USER_AVATAR'
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_RESET = 'LOGIN_RESET'
export const LOGOUT = 'LOGOUT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const DELIVER_SUCCEED = 'DELIVER_SUCCEED'
export const DELIVER_FAILED = 'DELIVER_FAILED'
export const CLICK_FOOTER = 'CLICK_FOOTER'
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'
export const REQUEST_UNREAD_MESSAGES_COUNT = 'REQUEST_UNREAD_MESSAGES_COUNT'
export const RECEIVE_UNREAD_MESSAGES_COUNT = 'RECEIVE_UNREAD_MESSAGES_COUNT'

export const tabClick = (tab) => {
	return {
		type: CLICK_TAB,
		tab
	}
}

export const requestTopics = (tab) => {
	return {
		type: REQUEST_TOPICS,
		tab
	}
}

export const receiveTopics = (tab, page, json) => {
	return {
		type: RECEIVE_TOPICS,
		tab,
		page,
		topics: json.data.map(child => child)
	}
}

export const fetchTopics = (tab = 'all', page = 1, limit = 20) => {
	return dispatch => {
		dispatch(requestTopics(tab))
		return fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=false`)
			.then(res => res.json())
			.then(json => dispatch(receiveTopics(tab, page, json)))
	}
}

export const topicClick = (id) => {
	return {
		type: CLICK_TOPIC,
		id
	}
}

export const requestTopicDetail = (id) => {
	return  {
		type: REQUEST_TOPIC_DETAIL,
		id
	}
}

export const receiveTopicDetail = (id, json) => {
	return {
		type: RECEIVE_TOPIC_DETAIL,
		id,
		detail: json.data
	}
}

export const fetchTopicDetail = (id) => {
	return dispatch => {
		dispatch(requestTopicDetail(id))
		return fetch(`https://cnodejs.org/api/v1/topic/${id}`)
			.then(res => res.json())
			.then(json => dispatch(receiveTopicDetail(id, json)))
	}
}

export const userAvatarClick = (userName) => {
	return {
		type: CLICK_USER_AVATAR,
		userName
	}
}

export const requestUserInfo = (userName) => {
	return {
		type: REQUEST_USER_INFO,
		userName
	}
}

export const receiveUserInfo = (userName, json) => {
	return {
		type: RECEIVE_USER_INFO,
		userName,
		userInfo: json.data
	}
}

export const fetchUserInfo = (userName) => {
	return dispatch => {
		dispatch(requestUserInfo(userName))
		return fetch(`https://cnodejs.org/api/v1/user/${userName}`)
			.then(res => res.json())
			.then(json => dispatch(receiveUserInfo(userName, json)))
	}
}

export const loginSucceed = (data) => {
	return {
		type: LOGIN_SUCCEED,
		data
	}
}

export const loginFailed = (msg) => {
	return {
		type: LOGIN_FAILED,
		msg
	}
}

export const loginReset = () => {
	return {
		type: LOGIN_RESET
	}
}

export const requestLogin = (token) => {
	return dispatch => {
		return fetch('https://cnodejs.org/api/v1/accesstoken', {
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `accesstoken=${token}`
		})
		.then(res => res.json())
		.then(json => {
			if (json.success) {
				dispatch(loginSucceed({
					loginname: json.loginname,
					id: json.id,
					token
				}))
			} else {
				dispatch(loginFailed(json.error_msg))
			}
		})
		.then(setTimeout(() => dispatch(loginReset()), 2000))
	}
}

export const logout = () => {
	return  {
		type: LOGOUT
	}
}

export const deliverSucceed = (topic_id) => {
	return {
		type: DELIVER_SUCCEED,
		topic_id
	}
}

export const deliverFailed = () => {
	return {
		type: DELIVER_FAILED
	}
}

export const deliver = (token, tab, title, content, callback) => {
	return dispatch => {
		return fetch('https://cnodejs.org/api/v1/topics', {
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `accesstoken=${token}&tab=${tab}&title=${title}&content=${content}`
		})
		.then(res => res.json())
		.then(json => {
			if (json.success) {
				dispatch(deliverSucceed(json.topic_id))
				dispatch(fetchTopicDetail(json.topic_id))
				callback(json.topic_id)
			} else {
				dispatch(deliverFailed(json.error_msg))
			}
		})
	}
}

export const footerClick = (tab) => {
	return {
		type: CLICK_FOOTER,
		tab
	}
}

export const requestMessages = () => {
	return {
		type: REQUEST_MESSAGES
	}
}

export const receiveMessages = (messages) => {
	return {
		type: RECEIVE_MESSAGES,
		messages
	}
}

export const fetchMessages = (token) => {
	return dispatch => {
		dispatch(requestMessages())

		return fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${token}`)
		.then(res => res.json())
		.then(json => {
			if (json.success) {
				dispatch(receiveMessages(json.data))
			}
		})
	}
}

export const requestUnreadMessagesCount = () => {
	return {
		type: REQUEST_UNREAD_MESSAGES_COUNT
	}
}

export const receiveUnreadMessagesCount = (count) => {
	return {
		type: RECEIVE_UNREAD_MESSAGES_COUNT,
		count
	}
}

export const fetchUnreadMessagesCount = (token) => {
	return dispatch => {
		dispatch(requestUnreadMessagesCount())

		return fetch(`https://cnodejs.org/api/v1/message/count?accesstoken=${token}`)
		.then(res => res.json())
		.then(json => {
			if (json.success) {
				dispatch(receiveUnreadMessagesCount(json.data))
			}
		})
	}
}