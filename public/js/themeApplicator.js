class ThemeApplicator {
    constructor() {
        this.$body = $("body");
        this.$body.prepend($(`<img class="hero" src="/img/banner.jpg">`));
        this.path = window.location.pathname.split('/');
        console.log(this.path);
        this.path = this.path[this.path.length - 1];
        console.log(this.path);
        this.$nav = $(`<nav></nav>`);
        //will need to be changed when notherbase-fs updates
        if (this.path == "the-front") this.$nav.append($(`<a class="selected" href="/">Home</a>`));
        else this.$nav.append($(`<a href="/">Home</a>`));
        if (this.path == "getInvolved") this.$nav.append($(`<a class="selected" href="/getInvolved">Get Involved</a>`));
        else this.$nav.append($(`<a href="/the-front/getInvolved">Get Involved</a>`));
        if (this.path == "resources") this.$nav.append($(`<a class="selected" href="/resources">Resources</a>`));
        else this.$nav.append($(`<a href="/the-front/resources">Resources</a>`));
        if (this.path == "contact") this.$nav.append($(`<a class="selected" href="/contact">Contact Us</a>`));
        else this.$nav.append($(`<a href="/the-front/contact">Contact Us</a>`));
        if (this.path == "about") this.$nav.append($(`<a class="selected" href="/about">About Us</a>`));
        else this.$nav.append($(`<a href="/the-front/about">About Us</a>`));
        this.$body.prepend(this.$nav);
        this.$body.prepend($(`<header>
                <a href="/">
                    <img src="/img/logo.jpg">
                </a>
            </header>`));

        this.$footer = $(`<div class="footer"></div>`).appendTo("body");
        this.$footer.append($("<h6>loveincoflewiscounty.org</h6>"));
        this.$footer.append($("<p>Love INC of Lewis County</p>"));
        this.$footer.append($("<p>PO Box 152</p>"));
        this.$footer.append($("<p>Chehalis, WA 98532</p>"));
        this.$footer.append($("<p>360-748-8611</p>"));
    }
}