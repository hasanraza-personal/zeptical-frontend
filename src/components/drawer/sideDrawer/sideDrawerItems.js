import { BoxArrowInRight, BoxArrowRight, CCircle, FileEarmarkText, Gear, InfoCircle, Key, PersonCircle, QuestionCircle, RCircle, Telephone } from 'react-bootstrap-icons';

export const SideDrawerItems = [
    {
        icon: RCircle,
        title: 'Register Startup',
        url: '/registerstartup',
        auth: true
    },
    {
        icon: CCircle,
        title: '21 Days Challange',
        url: '/challange',
        auth: true
    },
    {
        icon: Gear,
        title: 'Settings',
        url: 'user/settings',
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
    {
        icon: BoxArrowRight,
        title: 'Logout',
        url: '/logout',
        auth: true
    },
]

export const SideDrawerBottomItems = [
    {
        icon: FileEarmarkText,
        title: 'Privacy Policy',
        url: '/privacypolicy',
    },
    {
        icon: Key,
        title: 'Terms and Conditions',
        url: '/termsandconditions',
    },
]