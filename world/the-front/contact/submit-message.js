export default async function submitMessage(req, user) {
    let newMessage = {
        dateCreated: Date.now(),
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        phone: req.body.phone,
        ...req.body.ticket
    }

    // THE FOLLOWING IMAGE SOURCES ARE TEMPORARY AND WILL NEED TO BE REPLACED WITH THE ACTUAL IMAGE SOURCES (https://www.loveincoflewiscounty.org/img/banner.jpg)
    // render the data so it is readable in the email
    // the message will need to be rendered as HTML, with line breaks converted to <br> tags
    console.log(newMessage.message);
    await req.db.SendMail.send("exec.director@loveincoflewiscounty.org", `New Message for Love INC of Lewis County`, `
        <div style="border-radius:5px; width: 90%; padding: 20px; background: rgb(242,242,245);" class="custom-email-body">
            <img src="https://www.loveincoflewiscounty.org/build/image/2648.png?w=1500&h=425&fit=crop-48-54&s=b68fb57b38a818af110c9a98f5069ada" alt="Love INC of Lewis County Logo" style="width: 100%; height: auto;">
            <h1>New Message From: ${newMessage.name}</h1> 
            User's E-mail: ${newMessage.email}
            <br>
            Phone Number: ${newMessage.phone}
            <br>
            Submitted On: ${new Date(newMessage.dateCreated).toLocaleDateString()}
            <br>
            Message: ${newMessage.message.replace(/\n/g, "<br>")}
            <br>
            <br>
            <p>[This is an automated message sent through the Love INC of Lewis County website. Please do not reply to this email.]</p>
        </div>
    `);

    // send a confirmation email to the user
    await req.db.SendMail.send(newMessage.email, `Message Sent to Love INC of Lewis County`, `
        <div style="border-radius:5px; width: 90%; padding: 20px; background: rgb(242,242,245);" class="custom-email-body">
            <img src="https://www.loveincoflewiscounty.org/build/image/2648.png?w=1500&h=425&fit=crop-48-54&s=b68fb57b38a818af110c9a98f5069ada" alt="Love INC of Lewis County Logo" style="width: 100%; height: auto;">
            <h1>Thank you for reaching out!</h1> 
            Your message was sent to Love INC of Lewis County on ${new Date(newMessage.dateCreated).toLocaleDateString()}.
            <br>
            <p>We will reply as soon as we are able. Thank you for your patience!
            <br>
            <br>
            <br>
            <h2>Love INC of Lewis County</h2>
            PO Box 152
            <br>
            Chehalis, WA 98532
            <br>
            360-748-8611
            <br>
            <br>
            <p>[This is an automated message sent through the Love INC of Lewis County website. Please do not reply to this email.]</p>
        </div>
    `);

    return "Request submitted.";
}