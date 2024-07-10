export default async function submitMessage(req, user) {
    let newMessage = {
        dateCreated: Date.now(),
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        phone: req.body.phone,
        ...req.body.ticket
    }

    // require a cooldown between messages of 30 seconds
    if (!req.session.lastMessage) req.session.lastMessage = 0;
    if (Date.now() - req.session.lastMessage < 30000) return "Thank you! Please wait before submitting another message.";
    else {
        // render the data so it is readable in the email
        // the message will need to be rendered as HTML, with line breaks converted to <br> tags
        //req.db.SendMail.send("wyattsushi@gmail.com", `New Message for Love INC of Lewis County`, `
        req.db.SendMail.send("exec.director@loveincoflewiscounty.org", `New Message for Love INC of Lewis County`, `
            <img src="https://www.loveincoflewiscounty.org/img/banner.webp" alt="Love INC of Lewis County Logo" style="width:90%; height:auto;">
            <h1>New Message From: ${newMessage.name}</h1> 
            <p>User's E-mail: ${newMessage.email}</p>
            <p>Phone Number: ${newMessage.phone}</p>
            <p>Submitted On: ${new Date(newMessage.dateCreated).toLocaleDateString()}</p>
            <p>Message: ${newMessage.message.replace(/\n/g, "<br>")}</p>
            <br>
            <br>
            <h2>Love INC of Lewis County</h2>
            <p style="margin:0; padding:0;">PO Box 152</p>
            <p style="margin:0; padding:0;">Chehalis, WA 98532</p>
            <p style="margin:0; padding:0;">(360) 748-8611</p>
            <br>
            <p>[This is an automated message sent through the Love INC of Lewis County website. Please do not reply to this email.]</p>
        `);

        // send a confirmation email to the user
        req.db.SendMail.send(newMessage.email, `Message Sent to Love INC of Lewis County`, `
            <img src="https://www.loveincoflewiscounty.org/img/banner.webp" alt="Love INC of Lewis County Logo" style="width:90%; height:auto;">
            <h1>Thank you for reaching out!</h1> 
            <p>Your message was sent to Love INC of Lewis County on ${new Date(newMessage.dateCreated).toLocaleDateString()}.</p>
            <p>We will reply as soon as we are able. Thank you for your patience!</p>
            <br>
            <p>Below is a copy of the message you sent for your reference:</p>
            <p>Message: ${newMessage.message.replace(/\n/g, "<br>")}</p>
            <br>
            <br>
            <h2>Love INC of Lewis County</h2>
            <p style="margin:0; padding:0;">PO Box 152</p>
            <p style="margin:0; padding:0;">Chehalis, WA 98532</p>
            <p style="margin:0; padding:0;">(360) 748-8611</p>
            <br>
            <p>[This is an automated message sent through the Love INC of Lewis County website. Please do not reply to this email.]</p>
        `);

        req.session.lastMessage = Date.now();

        return "Thank you for your message! We will get back to you as soon as possible.";
    }
}