const getTime = () => {
    const addZero = (time) => {
      return time < 10 ? '0' + time : time;
    };
    const date = new Date();
    const thisHour = date.getHours();
    const thisFormattedHour = thisHour > 12 ? thisHour - 12 : thisHour;
    const ampm = thisHour < 12 ? 'AM' : 'PM';
    const thisMinute = date.getMinutes();
    return addZero(thisFormattedHour) + ':' + addZero(thisMinute) + ' ' + ampm;
  };
  
  const initialState = {
    secondsTillAlarm: 0,
    modalVisible: false,
    isAlarmSet: false,
    currentTime: getTime(),
  };

//reducer
export function alarmReducer(state = initialState, action) {
    if (action.type === 'secondsTillAlarm/decrement') {
      return {
        ...state,
        secondsTillAlarm: state.secondsTillAlarm - 1,
      };
    }
    if (action.type === 'secondsTillAlarm/setSecondsTillAlarm') {
      return {
        ...state,
        secondsTillAlarm: action.payload * 60,
      };
    }
    if (action.type === 'modalVisible/setModalVisible') {
      return {
        ...state,
        modalVisible: action.payload,
      };
    }
    if (action.type === 'time/setCurrentTime') {
      return {
        ...state,
        time: getTime(),
      };
    }
    if (action.type === 'isAlarmSet/setAlarm') {
      return {
        ...state,
        isAlarmSet: action.payload,
      };
    }
    return state;
  }