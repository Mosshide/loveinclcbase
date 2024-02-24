export default async function submitApplication(req, user) {
    let newTicket = {
        dateCreated: Date.now(),
        ...req.body.ticket
    }

    await req.db.SendMail.send(user.memory.data.email, `New IT Request Submitted Successfully`, `
        <h1>Request: ${newTicket.title}</h1> <br>
        Ticket ID: ${newTicket.id} <br>
        Submitted On: ${new Date(newTicket.date).toLocaleDateString()} <br>
        Description: ${newTicket.description}
    `);

    return "Request submitted.";
}