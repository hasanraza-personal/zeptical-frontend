import { Bell, BoxArrowInRight, CCircle, Gear, InfoCircle, PersonCircle, QuestionCircle, RCircle, Telephone } from 'react-bootstrap-icons';

export const SideDrawerItems = [
    {
        icon: Bell,
        title: 'Notification',
        url: '/user/Notification',
        auth: true
    },
    {
        icon: RCircle,
        title: 'Register Startup',
        url: '/registerstartup',
        auth: true
    },
    {
        icon: CCircle,
        title: 'Coming Soon',
        url: '/challange',
        auth: true
    },
    {
        icon: Gear,
        title: 'Settings',
        url: '/user/settings',
        auth: true
    },
    {
        icon: PersonCircle,
        title: 'Login',
        url: '/login',
        auth: false
    },
    {
        icon: BoxArrowInRight,
        title: 'Sign Up',
        url: '/signup',
        auth: false
    },
    {
        icon: QuestionCircle,
        title: 'FAQ',
        url: '/faq',
        auth: 'not required'
    },
    {
        icon: InfoCircle,
        title: 'About Us',
        url: '/aboutus',
        auth: 'not required'
    },
    {
        icon: Telephone,
        title: 'Contact Us',
        url: '/contactus',
        auth: 'not required'
    },
]

// export const SideDrawerBottomItems = [
//     {
//         icon: FileEarmarkText,
//         title: 'Privacy Policy',
//         url: '/privacypolicy',
//     },
//     {
//         icon: Key,
//         title: 'Terms and Conditions',
//         url: '/termsandconditions',
//     },
// ]