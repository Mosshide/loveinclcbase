// this class is used to apply the theme to the website
class ThemeApplicator {
    constructor(settings) {
        this.settings = {
            hero: false,
            description: "Love INC of Lewis County is mobilizing the church to transform lives.",
            ...settings
        };

        this.path = window.location.pathname.split('/');
        this.path = this.path[this.path.length - 1];

        // get all the elements needed
        this.$head = $("head");
        this.$main = $("main");
        this.$body = $("body");

        // add the font awesome css to the head
        //this.$head.append($(`<link async rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">`));

        //ADD FONTS
        this.$head.append($(`<link async href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">`));

        // add the meta description to the head
        this.$head.append($(`<meta name="description" content="${this.settings.description}">`));

        // add the nav button for mobile
        this.$navButton = $("<button id='nav-button'>Navigation<i class='fa-solid fa-bars'></i></button>").prependTo(this.$main);
        this.$navButton.click(() => this.enableNavMobile());
        
        // add the nav
        this.$nav = $(`<nav></nav>`).prependTo(this.$body);
        // add the logo
        this.$nav.append($(`<a class="nav-header" href="/"><img src="/img/banner.webp" alt="Love INC of Lewis County"></a>`));
        // add the nav items
        this.$navItems = $(`<ul></ul>`).appendTo(this.$nav);
        if (this.path == "the-front") this.$navItems.append($(`<a class="selected" href="/the-front"><p>Home</p></a>`));
        else this.$navItems.append($(`<a href="/the-front"><p>Home</p></a>`));
        if (this.path == "getInvolved") this.$navItems.append($(`<a class="selected" href="/getInvolved"><p>Get Involved</p></a>`));
        else this.$navItems.append($(`<a href="/getInvolved"><p>Get Involved</p></a>`));
        if (this.path == "resources") this.$navItems.append($(`<a class="selected" href="/resources"><p>Resources</p></a>`));
        else this.$navItems.append($(`<a href="/resources"><p>Resources</p></a>`));
        if (this.path == "contact") this.$navItems.append($(`<a class="selected" href="/contact"><p>Contact Us</p></a>`));
        else this.$navItems.append($(`<a href="/contact"><p>Contact Us</p></a>`));
        if (this.path == "about") this.$navItems.append($(`<a class="selected" href="/about"><p>About Us</p></a>`));
        else this.$navItems.append($(`<a href="/about"><p>About Us</p></a>`));
        this.$navItems.append($(`<a id="donate" href="https://loveinclewiscounty.maxgiving.com/"><p>Donate</p></a>`));
        // add the close button for mobile
        this.$closeNav = $(`<button id="close-nav"><i class="fa-solid fa-xmark"></i></button>`).appendTo(this.$nav);
        this.$closeNav.click(() => this.disableNavMobile());

        // add the Love INC National reference bar
        this.$national = $(`<div class="national"></div>`).prependTo(this.$body);
        // add the Love INC National logo container
        this.$nationalLogoItems = $(`<div class="logo-items"></div>`).appendTo(this.$national);
        // add the Love INC logo
        this.$nationalLogoItems.append($(`<img src="/img/logo-icon-transparent-mono-mini.png" alt="Love INC Logo">`));
        // add the Love INC National link
        this.$nationalLogoItems.append($(`<p>AN AFFILIATE OF <a href="https://loveinc.org" target="_blank">LOVE IN THE NAME OF CHRIST NATIONAL</a></p>`));
        // add the Love INC National items
        this.$nationalItems = $(`<ul></ul>`).appendTo(this.$national);
        // add the WHAT IS LOVE INC link
        //this.$nationalItems.append($(`<a href="/about" target="_blank">WHAT IS LOVE INC</a>`));
        // add the START A LOVE INC NEAR YOU link
        this.$nationalItems.append($(`<a href="https://loveinc.org/start-a-love-inc" target="_blank">START A LOVE INC NEAR YOU</a>`));

        // add the footer
        this.$footer = $(`<div class="footer"></div>`).appendTo("body");
        // add the footer items
        this.$footer.append($("<h6>loveincoflewiscounty.org</h6>"));
        this.$footer.append($("<p>Love INC of Lewis County</p>"));
        this.$footer.append($("<p>PO Box 152</p>"));
        this.$footer.append($("<p>Chehalis, WA 98532</p>"));
        this.$footer.append($("<p>(360) 748-8611</p>")); 
        this.$footer.append($(`<a href="/tac" target="_blank">Terms and Conditions</a>`));  
        this.$footer.append($(`<a href="/privacy" target="_blank">Privacy Policy</a>`));
    }

    enableNavMobile() {
        this.$nav.addClass("mobile-full");
        this.$main.addClass("nav-open");
    }

    disableNavMobile() {
        this.$nav.removeClass("mobile-full");
        this.$main.removeClass("nav-open");
    }
}