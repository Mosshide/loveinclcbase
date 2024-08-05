export default async function submitApplication(req, user) {
    let newApplication = {
        dateCreated: Date.now(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telephone: req.body.telephone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        dob: req.body.dob,
        pob: req.body.pob,
        church: req.body.church,
        member: req.body.member,
        years: req.body.years,
        pastor: req.body.pastor,
        ref1: req.body.ref1,
        ref1Phone: req.body.ref1Phone,
        ref2: req.body.ref2,
        ref2Phone: req.body.ref2Phone,
        ref3: req.body.ref3,
        ref3Phone: req.body.ref3Phone,
        reason: req.body.reason,
        education: req.body.education,
        employment: req.body.employment,
        military: req.body.military,
        interests: req.body.interests,
        support: req.body.support,

        testimony: req.body.testimony,
        faithSignature: req.body.faithSignature,
        faithDate: req.body.faithDate,

        backgroundFirst: req.body.backgroundFirst,
        backgroundMiddle: req.body.backgroundMiddle,
        backgroundLast: req.body.backgroundLast,
        backgroundAlias: req.body.backgroundAlias,
        backgroundDob: req.body.backgroundDob,
        backgroundGender: req.body.backgroundGender,
        backgroundSignature: req.body.backgroundSignature,
        backgroundDate: req.body.backgroundDate,
        ...req.body.ticket
    }

    // require a cooldown between applications of 1 hour 
    if (!req.session.lastApplication) req.session.lastApplication = 0;
    if (Date.now() - req.session.lastApplication < 3600000) return "Thank you! Please wait before submitting another application.";
    else {
        // render the data so it is readable in the email
        // the message will need to be rendered as HTML, with line breaks converted to <br> tags
        //req.db.SendMail.send("wyattsushi@gmail.com", `New Volunteer Application for Love INC of Lewis County`, `
        req.db.SendMail.send("volunteers@loveincoflewiscounty.org", `New Volunteer Application for Love INC of Lewis County`, `
            <img src="https://www.loveincoflewiscounty.org/img/banner.jpg" alt="Love INC of Lewis County Logo" style="width: 90%; height: auto;">
            <h1>New Volunteer Application for: ${newApplication.firstName + " " + newApplication.lastName}</h1> 
            <p>Submitted On: ${new Date(newApplication.dateCreated).toLocaleDateString()}</p>
            <p>Telephone: ${newApplication.telephone}</p>
            <p>Email: ${newApplication.email}</p>
            <p>Address: ${newApplication.address ? newApplication.address + ", " : ""}${newApplication.city ? newApplication.city + ", " : ""}
            ${newApplication.state ? newApplication.state + " " : ""} ${newApplication.zip ? newApplication.zip + ", " : ""}
            ${newApplication.country ? newApplication.country : ""}</p>
            <p>Date of Birth: ${newApplication.dob ? new Date(newApplication.dob + "T00:00:00").toLocaleDateString() : ""}</p>
            <p>Place of Birth: ${newApplication.pob}</p>
            <p>Church: ${newApplication.church}</p>
            <p>Is a member: ${newApplication.member ? newApplication.member : ""}</p>
            <p>Years a member: ${newApplication.years}</p>
            <p>Pastor: ${newApplication.pastor}</p>
            <p>Reference 1: ${newApplication.ref1}</p>
            <p>Reference 1 Phone: ${newApplication.ref1Phone}</p>
            <p>Reference 2: ${newApplication.ref2}</p>
            <p>Reference 2 Phone: ${newApplication.ref2Phone}</p>
            <p>Reference 3: ${newApplication.ref3}</p>
            <p>Reference 3 Phone: ${newApplication.ref3Phone}</p>
            <p>Reason for volunteering: ${newApplication.reason.replace(/\n/g, "<br>")}</p>
            <p>Education: ${newApplication.education}</p>
            <p>Employment: ${newApplication.employment.replace(/\n/g, "<br>")}</p>
            <p>Military: ${newApplication.military ? newApplication.military : ""}</p>
            <p>Interests: ${newApplication.interests.replace(/\n/g, "<br>")}</p>
            <p>Support: ${newApplication.support.replace(/\n/g, "<br>")}</p>
            <h3>Statement of Faith Agreement</h3>
            <p>Personal Testimony: ${newApplication.testimony.replace(/\n/g, "<br>")}</p>
            <p>Statement of Faith Electronic Signature: ${newApplication.faithSignature}</p>
            <p>Statement of Faith Signature Date: ${new Date(newApplication.faithDate + "T00:00:00").toLocaleDateString()}</p>
            <h3>Background Check Agreement</h3>
            <p>First Name: ${newApplication.backgroundFirst}</p>
            <p>Middle Name: ${newApplication.backgroundMiddle}</p>
            <p>Last Name: ${newApplication.backgroundLast}</p>
            <p>Alias: ${newApplication.backgroundAlias}</p>
            <p>Date of Birth: ${new Date(newApplication.backgroundDob + "T00:00:00").toLocaleDateString()}</p>
            <p>Gender on Birth Certificate: ${newApplication.backgroundGender}</p>
            <p>Background Check Electronic Signature: ${newApplication.backgroundSignature}</p>
            <p>Background Check Signature Date: ${new Date(newApplication.backgroundDate + "T00:00:00").toLocaleDateString()}</p>
            <br>
            <br>
            <br>
            <h2>Love INC of Lewis County</h2>
            <p style="margin:0; padding:0;">PO Box 152</p>
            <p style="margin:0; padding:0;">Chehalis, WA 98532</p>
            <p style="margin:0; padding:0;">(360) 748-8611</p>
            <br>
            <p>[This is an automated message sent through the Love INC of Lewis County website. Please do not reply to this email.]</p>
        `, "Love INC of Lewis County");
    
        // send a confirmation email to the user
        if (newApplication.email) req.db.SendMail.send(newApplication.email, `Volunteer Application Sent to Love INC of Lewis County`, `
            <img src="https://www.loveincoflewiscounty.org/img/banner.jpg" alt="Love INC of Lewis County Logo" style="width: 90%; height: auto;">
            <h1>Thank you for applying to volunteer!</h1> 
            <p>Your application was sent to Love INC of Lewis County on ${new Date(newApplication.dateCreated).toLocaleDateString()}.</p>
            <p>We will reply as soon as we are able. Thank you for your patience!</p>
            <br>
            <br>
            <br>
            <h2>Love INC of Lewis County</h2>
            <p style="margin:0; padding:0;">PO Box 152</p>
            <p style="margin:0; padding:0;">Chehalis, WA 98532</p>
            <p style="margin:0; padding:0;">(360) 748-8611</p>
            <br>
            <p>[This is an automated message sent through the Love INC of Lewis County website. Please do not reply to this email.]</p>
        `, "Love INC of Lewis County");
    
        req.session.lastApplication = Date.now();

        return "Thank you for your application! We will get back to you as soon as possible.";
    }
}