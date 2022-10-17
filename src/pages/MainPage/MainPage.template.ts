export default `
ul.index-main-menu
                         li
                             button(data-props='registerPage')
                         li
                             button(data-props='loginPage')
                         li
                             button(data-props='404')
                         li
                             button(data-props='500')
                         li
                             button(data-props='test')
                         li
                             button(data-props='chat')
                         li
                             a(href='~static/pages/changePassword/changePassword.pug') change pass
                         li
                             a(href='~static/pages/changeAvatar/changeAvatar.pug') change avatar
`;
