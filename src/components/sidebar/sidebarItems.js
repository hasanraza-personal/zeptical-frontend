import { Bell, Book, CCircle, Envelope, Gear, House, InfoCircle, Newspaper, QuestionCircle, RCircle, Search, Telephone } from 'react-bootstrap-icons';

export const SidebarNavItems = [
    {
        icon: House,
        title: 'Home',
        url: '/user/home',
    },
    {
        icon: Search,
        title: 'Search',
        url: '/user/search',
    },
    {
        icon: Book,
        title: 'Book',
        url: '/user/book',
    },
    {
        icon: Newspaper,
        title: 'Newspaper',
        url: '/user/newspaper',
    },
    {
        icon: Envelope,
        title: 'Message',
        url: '/user/message',
    },
    {
        icon: Bell,
        title: 'Notification',
        url: '/user/Notification',
    },
    {
        icon: RCircle,
        title: 'Register Startup',
        url: '/registerstartup',
    },
    // {
    //     icon: CCircle,
    //     title: 'Coming Soon',
    //     url: '/challange',
    // },
    {
        icon: Gear,
        title: 'Settings',
        url: '/user/settings',
    },
    {
        icon: QuestionCircle,
        title: 'FAQ',
        url: '/faq',
    },
    {
        icon: InfoCircle,
        title: 'About Us',
        url: '/aboutus',
    },
    {
        icon: Telephone,
        title: 'Contact Us',
        url: '/contactus',
    },
]