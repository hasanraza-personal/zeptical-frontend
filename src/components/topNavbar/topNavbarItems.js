import { BoxArrowInRight, InfoCircle, PersonCircle, QuestionCircle, Telephone } from 'react-bootstrap-icons';

export const TopNavbarItems = [
    {
        icon: QuestionCircle,
        title: 'FAQ',
        url: '/faq'
    },
    {
        icon: InfoCircle,
        title: 'About Us',
        url: '/aboutus'
    },
    {
        icon: Telephone,
        title: 'Contact Us',
        url: '/contactus'
    },
    {
        icon: PersonCircle,
        title: 'Login',
        url: '/login'
    },
    {
        icon: BoxArrowInRight,
        title: 'Sign Up',
        url: '/signup'
    }
]