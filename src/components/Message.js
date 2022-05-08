const Message = (props) => {
  return (
    <div className='form'>
      <div className='message'>{props.message}</div>
      <div className='buttons'>
        <button type='submit' onClick={props.onClick}>
          {props.buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Message;
