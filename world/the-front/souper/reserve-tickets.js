export default async function submitApplication(req, user) {
    let newTicket = {
        dateCreated: Date.now(),
        name: req.body.name,
        amount: req.body.amount,
        email: req.body.email,
        ...req.body.ticket
    }

    // require a cooldown between applications of 1 minute
    if (!req.session.lastApplication) req.session.lastApplication = 0;
    if (Date.now() - req.session.lastApplication < 60 * 1000) return "Thank you! Please wait before submitting another application.";
    else {
        await req.db.Spirit.create("souper-tickets-0424", newTicket);

        //await req.db.SendMail.send("volunteers@loveincoflewiscounty.org", `New Volunteer Application for Love INC of Lewis County`, `
        await req.db.SendMail.send("wyattsushi@gmail.com", `New Volunteer Application for Love INC of Lewis County`, `
            <div style="border-radius:5px; width: 90%; padding: 20px; background: rgb(242,242,245);" class="custom-email-body">
                <img src="https://loveinclcbase-99e96083d1e2.herokuapp.com/img/banner.jpg" alt="Love INC of Lewis County Logo" style="width: 100%; height: auto;">
                <h1>New Volunteer Application for: ${newApplication.firstName + " " + newApplication.lastName}</h1> 
                Submitted On: ${new Date(newApplication.dateCreated).toLocaleDateString()}
                <br>
                Telephone: ${newApplication.telephone}
                <br>
                Email: ${newApplication.email}
                <br>
                Address: ${newApplication.address ? newApplication.address + ", " : ""}${newApplication.city ? newApplication.city + ", " : ""}
                ${newApplication.state ? newApplication.state + " " : ""} ${newApplication.zip ? newApplication.zip + ", " : ""}
                ${newApplication.country ? newApplication.country : ""}
                <br>
                Date of Birth: ${newApplication.dob ? new Date(newApplication.dob + "T00:00:00").toLocaleDateString() : ""}
                <br>
                Place of Birth: ${newApplication.pob}
                <br>
                Church: ${newApplication.church}
                <br>
                Is a member: ${newApplication.member ? newApplication.member : ""}
                <br>
                Years a member: ${newApplication.years}
                <br>
                Pastor: ${newApplication.pastor}
                <br>
                Reference 1: ${newApplication.ref1}
                <br>
                Reference 1 Phone: ${newApplication.ref1Phone}
                <br>
                Reference 2: ${newApplication.ref2}
                <br>
                Reference 2 Phone: ${newApplication.ref2Phone}
                <br>
                Reference 3: ${newApplication.ref3}
                <br>
                Reference 3 Phone: ${newApplication.ref3Phone}
                <br>
                Reason for volunteering: ${newApplication.reason.replace(/\n/g, "<br>")}
                <br>
                Education: ${newApplication.education}
                <br>
                Employment: ${newApplication.employment.replace(/\n/g, "<br>")}
                <br>
                Military: ${newApplication.military ? newApplication.military : ""}
                <br>
                Interests: ${newApplication.interests.replace(/\n/g, "<br>")}
                <br>
                Support: ${newApplication.support.replace(/\n/g, "<br>")}
                <br>
                <h3>Statement of Faith Agreement</h3>
                Personal Testimony: ${newApplication.testimony.replace(/\n/g, "<br>")}
                <br>
                Statement of Faith Electronic Signature: ${newApplication.faithSignature}
                <br>
                Statement of Faith Signature Date: ${new Date(newApplication.faithDate + "T00:00:00").toLocaleDateString()}
                <br>
                <h3>Background Check Agreement</h3>
                First Name: ${newApplication.backgroundFirst}
                <br>
                Middle Name: ${newApplication.backgroundMiddle}
                <br>
                Last Name: ${newApplication.backgroundLast}
                <br>
                Alias: ${newApplication.backgroundAlias}
                <br>
                Date of Birth: ${new Date(newApplication.backgroundDob + "T00:00:00").toLocaleDateString()}
                <br>
                Gender on Birth Certificate: ${newApplication.backgroundGender}
                <br>
                Background Check Electronic Signature: ${newApplication.backgroundSignature}
                <br>
                Background Check Signature Date: ${new Date(newApplication.backgroundDate + "T00:00:00").toLocaleDateString()}
                <br>
                <br>
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
    
        if (newTicket.email) await req.db.SendMail.send(newTicket.email, `Volunteer Application Sent to Love INC of Lewis County`, `
            <div style="border-radius:5px; width: 90%; padding: 20px; background: rgb(242,242,245);" class="custom-email-body">
                <img src="https://loveinclcbase-99e96083d1e2.herokuapp.com/img/banner.jpg" alt="Love INC of Lewis County Logo" style="width: 100%; height: auto;">
                <h1>Thank you for applying to volunteer!</h1> 
                Your application was sent to Love INC of Lewis County on ${new Date(newApplication.dateCreated).toLocaleDateString()}.
                <br>
                <p>We will reply as soon as we are able. Thank you for your patience!
                <br>
                <br>
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
    
        req.session.lastApplication = Date.now();

        return "Thank you for your application! We will get back to you as soon as possible.";
    }
}