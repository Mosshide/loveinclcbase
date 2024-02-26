class ThemeApplicator {
    constructor(settings) {
        this.settings = {
            hero: false,
            ...settings
        };

        this.$head = $("head");
        this.$head.append($(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">`));

        this.$main = $("main");
        this.$navButton = $("<button id='nav-button'><i class='fa-solid fa-bars'></i></button>").prependTo(this.$main);
        this.$navButton.click(() => this.enableNavMobile());

        this.$body = $("body");
        if (this.settings.hero) {
            this.$body.prepend($(`<img class="hero" src="/img/banner.jpg">`));
            this.$main.addClass("heroed");
        }
        this.path = window.location.pathname.split('/');
        this.path = this.path[this.path.length - 1];
        this.$nav = $(`<nav></nav>`);
        //will need to be changed when notherbase-fs updates
        if (this.path == "the-front") this.$nav.append($(`<a class="selected" href="/the-front">Home</a>`));
        else this.$nav.append($(`<a href="/the-front">Home</a>`));
        if (this.path == "getInvolved") this.$nav.append($(`<a class="selected" href="/getInvolved">Get Involved</a>`));
        else this.$nav.append($(`<a href="/getInvolved">Get Involved</a>`));
        if (this.path == "resources") this.$nav.append($(`<a class="selected" href="/resources">Resources</a>`));
        else this.$nav.append($(`<a href="/resources">Resources</a>`));
        if (this.path == "contact") this.$nav.append($(`<a class="selected" href="/contact">Contact Us</a>`));
        else this.$nav.append($(`<a href="/contact">Contact Us</a>`));
        if (this.path == "about") this.$nav.append($(`<a class="selected" href="/about">About Us</a>`));
        else this.$nav.append($(`<a href="/about">About Us</a>`));
        this.$closeNav = $(`<button id="close-nav"><i class="fa-solid fa-xmark"></i></button>`).appendTo(this.$nav);
        this.$closeNav.click(() => this.disableNavMobile());
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

    enableNavMobile() {
        this.$nav.addClass("mobile-full");
        window.onscroll = function () {  window.scrollTo(0, 0); };
    }

    disableNavMobile() {
        this.$nav.removeClass("mobile-full");
        window.onscroll = function () {};
    }
}