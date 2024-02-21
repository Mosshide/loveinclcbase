class ThemeApplicator {
    constructor() {
        $("body").prepend($(
            `<header>
                <a href="/loveinclc">
                    <img src="/img/logo.jpg">
                </a>
            </header>
            <nav>
                <a href="/">Home</a>
                <a href="/the-front/getInvolved">Get Involved</a>
                <a href="/the-front/resources">Resources</a>
                <a href="/the-front/question">Question?</a>
                <a href="/the-front/contact">Contact Us</a>
                <a href="/the-front/about">About Us</a>
            </nav>
            <img class="hero" src="/img/banner.jpg">`
        ));
        $("footer").append($("<h6>loveincoflewiscounty.org</h6>"));
        $("footer").append($("<p>PO Box 152</p>"));
        $("footer").append($("<p>Chehalis, WA 98532</p>"));
        $("footer").append($("<p>360-748-8611</p>"));
    }
}