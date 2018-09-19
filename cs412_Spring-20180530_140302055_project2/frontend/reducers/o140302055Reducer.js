export default function(state = {pending: false, data: [{}]},action){
	console.log({state, action});
	switch (action.type){
		case "REQUEST_PHOTO":
			return {pending: true, data: [{}]};

		case "GET_PHOTO":
			return {pending:false,data:action.response.data};
		default:
			return state;
	}
	return state;
}
