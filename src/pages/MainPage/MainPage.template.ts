export default `
ul.index-main-menu
                         li
                             button(data-props='registerPage') Register
                         li
                             button(data-props='loginPage') Login
                         li
                             button(data-props='404') 404
                         li
                             button(data-props='500') 500
                         li
                             button(data-props='test') test
                         li
                             a(href='~static/pages/userSettings/userSettings.pug') settings
                         li
                             a(href='~static/pages/changePassword/changePassword.pug') change pass
                         li
                             a(href='~static/pages/changeAvatar/changeAvatar.pug') change avatar
`;
