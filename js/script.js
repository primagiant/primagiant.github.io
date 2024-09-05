// Initialize AOS CDN
AOS.init();

// Sweetalert2 Preparation
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

// Preloader dengan Jquery
$(window).on("load", function () {
    $('.preloader-container').fadeOut();
})
// MENU SHOW HIDEN
const navMenu = document.getElementById("nav-menu"),
    toggleMenu = document.getElementById("nav-toggle"),
    closeMenu = document.getElementById("nav-close")

// SHOW
toggleMenu.addEventListener('click', function () {
    navMenu.classList.toggle('show');
})

// HIDE
closeMenu.addEventListener('click', function () {
    navMenu.classList.toggle('show');
})

// REMOVE MENU and SCROLL ACTION
$('.nav-link').on('click', function (e) {
    let href = $(this).attr('href');
    let elementHref = $(href);

    navMenu.classList.remove('show')

    $("html,body").animate({
        scrollTop: elementHref.offset().top
    }, 500, 'easeInOutExpo')

    e.preventDefault()
})

// FILTER SCRIPT UNTUK PROJECT SECTION
$(document).ready(function () {
    $(".project-filter-list").on('click', function () {
        const type = $(this).attr('data-filter');
        if (type == 'all') {
            $(".project-list").show('1000');
        } else {
            $(".project-list").not("." + type).hide('1000');
            $(".project-list").filter("." + type).show('1000');
        }
    })
})

// GET IN TOUCH
$(document).ready(function () {
    $(".contact-form").on('submit', function (e) {
        e.preventDefault();

        const data = $(this).serialize();
        const action = e.target.action;
        const name = $('#name').val();
        const email = $('#email').val();
        const comment = $('#comment').val();

        if (name !== "" && email !== "" && comment !== "") {
            $.ajax({
                url: action,
                type: 'POST',
                data: data,
                success: function () {
                    Toast.fire({
                        icon: "success",
                        title: "Email Sended"
                    });
                },
                error: function (err) {
                    console.log(err);
                    Toast.fire({
                        icon: "error",
                        title: "Error sending email"
                    });
                }
            });
        } else {
            Toast.fire({
                icon: "info",
                title: "Mohon isi semua Field"
            });
        }

    });
})

// CHANGE THEME
const themeChanger = document.querySelector('.change-theme');
const themeColor = document.querySelectorAll('.theme-color');

themeColor.forEach(color => color.addEventListener('click', () => {
    let theme = color.getAttribute('data-theme');
    if (theme == "") {
        themeChanger.setAttribute('href', theme)
    } else {
        themeChanger.setAttribute('href', 'css/' + theme + '.css')
    }
    navMenu.classList.remove('show')
}))

// FOOTER COPYRIGHT
$(document).ready(() => {
    const currentYear = new Date().getFullYear()
    $(".footer-copy-text").text(currentYear)
})
