/* Original function from the reference, now shows a toast instead of a plain alert */
function welcomeMessage() {
    $("#toast").stop(true, true)
        .text("Welcome to my Personal Resume Website!")
        .fadeIn(250).delay(2600).fadeOut(400);
}

$(document).ready(function () {

    /* 1. Highlight the current page in the navigation (active class) */
    var page = window.location.pathname.split("/").pop() || "index.html";
    if (page === "") { page = "index.html"; }
    $("nav a").each(function () {
        if ($(this).attr("href") === page) {
            $(this).addClass("active").attr("aria-current", "page");
        } else {
            $(this).removeClass("active");
        }
    });

    /* 2. Dark / light mode, remembered between pages */
    function applyTheme(mode) {
        $("body").toggleClass("dark", mode === "dark");
        $("#themeToggle").text(mode === "dark" ? "Light mode" : "Dark mode");
    }
    var saved = "light";
    try { saved = localStorage.getItem("theme") || "light"; } catch (e) {}
    applyTheme(saved);

    $("#themeToggle").on("click", function () {
        var next = $("body").hasClass("dark") ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem("theme", next); } catch (e) {}
    });

    /* 3. Welcome button on the Home page */
    $("#welcomeBtn").on("click", welcomeMessage);

    /* 4. Typing effect for the role line (Home page) */
    var $role = $("#typed");
    if ($role.length) {
        var phrases = ["B.E. Engineering Student", "Aspiring Web Developer", "Python and JavaScript Learner"];
        var p = 0, c = 0, deleting = false;
        (function type() {
            var word = phrases[p];
            c += deleting ? -1 : 1;
            $role.text(word.substring(0, c));
            var delay = deleting ? 40 : 85;
            if (!deleting && c === word.length) { deleting = true; delay = 1400; }
            else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 400; }
            setTimeout(type, delay);
        })();
    }

    /* 5. Animate skill bars when they scroll into view (Resume page) */
    function showBars() {
        var winBottom = $(window).scrollTop() + $(window).height();
        $(".bar span").each(function () {
            var $b = $(this);
            if (!$b.data("done") && $b.offset().top < winBottom - 20) {
                $b.css("width", $b.data("level") + "%").data("done", true);
                $b.css("--w", $b.data("level") + "%");
            }
        });
    }
    $(".bar span").each(function () { $(this).css("--w", $(this).data("level") + "%"); });
    showBars();

    /* 6. Click a project card to expand / collapse its details */
    $(".projects li").on("click", function () {
        $(this).find(".detail").slideToggle(200);
    });

    /* 7. Print button on the Resume page */
    $("#printBtn").on("click", function () { window.print(); });

    /* 8. Back-to-top button */
    $(window).on("scroll", function () {
        $(window).scrollTop() > 300 ? $("#toTop").fadeIn(200) : $("#toTop").fadeOut(200);
        showBars();
    });
    $("#toTop").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });
});
