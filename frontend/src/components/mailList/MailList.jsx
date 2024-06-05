import "./mailList.css";

const MailList = () => {
  const handleSubscribe = () => {
    const email = document.getElementById("emailInput").value;
    window.location.href = `mailto:yatritourismpune@gmail.com?subject=Query%20from%20Travel%20Website&body=Hello,%0D%0A%0D%0AI'm%20interested%20in%20planning%20a%20getaway.%20Please%20assist%20me.%0D%0A%0D%0A${email}`;
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">
        If you haven't found your ideal destination yet, feel free to send us your query via email.
      </h1>
      <span className="mailDesc">We're here to assist you in planning your perfect getaway!</span>
      <div className="mailInputContainer">
        <input type="email" id="emailInput" placeholder="Your Query" />
        <button onClick={handleSubscribe}>Send!</button>
      </div>
    </div>
  );
};

export default MailList;
