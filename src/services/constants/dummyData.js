import { order_statuses, product_categories, product_typees } from ".";
import { appImages } from "../utilities";

export const users = [
    {
        id: 8373,
        name: 'Jenny Wilson',
        image: appImages.user1,
        address: 'London',
    },
    {
        id: 22345,
        name: 'William Shaw',
        image: appImages.user2,
        address: 'London',
    },
    {
        id: 46216,
        name: 'Jackobe Black',
        image: appImages.user5,
        address: 'New York',
    },
    {
        id: 8453,
        name: 'John Thomas',
        image: appImages.user3,
        address: 'London',
    },
    {
        id: 23445,
        name: 'Nilson Meno',
        image: appImages.user4,
        address: 'New York',
    },
]
export const comments = [
    {
        comment: 'Corrupti provident at explicabo quos quasi sit voluptatem.',
        created_at: '23 mins',
        user: users[1],
        replies: [
            {
                comment: 'At laboriosam recusandae sed omnis sit earum omnis.',
                created_at: '2w ago',
                user: users[3],
            }
        ]
    },
    {
        comment: 'Mollitia eum id tempore provident quasi consequatur numquam.',
        created_at: '2h ago',
        user: users[0],
    },
    {
        comment: 'Architecto sequi et sint accusamus.',
        created_at: '1d ago',
        user: users[2],
        replies: [
            {
                comment: 'Mollitia eum id tempore provident quasi consequatur numquam.',
                created_at: '2h ago',
                user: users[1],
            }
        ]
    },
    {
        comment: 'At laboriosam recusandae sed omnis sit earum omnis.',
        created_at: '2w ago',
        user: users[0],
    },
]
export const groups = [
    {
        image: appImages.audio_book_2,
        title: 'Audio Lovers',
        members_count: '2.2k',
        user: users[2]
    },
    {
        image: appImages.ebook_2,
        title: 'Books Champ',
        members_count: '3.5k',
        user: users[1]
    },
    {
        image: appImages.audio_book_1,
        title: 'New Comics',
        members_count: '1.7k',
        user: users[0]
    }
]
export const posts = [
    {
        user: users[0],
        created_at: '2 months ago',
        description: 'Amet ducimus magnam et quasi veniam ea voluptatem. Rerum earum aliquam reprehenderit veritatis perferendis rem. Provident dignissimos voluptas.',
        image: appImages.product1,
        likes_count: '43',
        comments_count: '12',
        comments: [comments[2]],
        is_liked: true,
        type: 'post'
    },
    {
        user: users[2],
        created_at: '3 hours ago',
        description: 'Voluptatem. Rerum earum aliquam reprehenderit veritatis perferendis rem. Provident dignissimos voluptas.',
        image: appImages.product3,
        likes_count: '18',
        comments_count: '3',
        comments: [comments[1]],
        is_liked: false,
        type: 'post'
    },
    {
        user: users[1],
        created_at: '3 hours ago',
        description: 'Voluptatem. Rerum earum aliquam reprehenderit veritatis perferendis rem. Provident dignissimos voluptas.',
        image: appImages.product2,
        likes_count: '18',
        comments_count: '3',
        comments: [comments[1]],
        is_liked: false,
        type: 'fundRaisingProject'
    },
    {
        user: users[4],
        created_at: '3 hours ago',
        description: 'Voluptatem. Rerum earum aliquam reprehenderit veritatis perferendis rem. Provident dignissimos voluptas.',
        image: appImages.product5,
        likes_count: '34',
        comments_count: '12',
        comments: [comments[2]],
        is_liked: false,
        type: 'post',
        group:groups[1]
    }
]
export const conversations = [
    {
        message: 'Corrupti provident at explicabo quos quasi sit voluptatem.',
        time: '23 mins',
        user: users[4]
    },
    {
        message: 'Mollitia eum id tempore provident quasi consequatur numquam.',
        time: '2h ago',
        user: users[2]
    },
    {
        message: 'Architecto sequi et sint accusamus.',
        time: '1d ago',
        user: users[0]
    },
    {
        message: 'At laboriosam recusandae sed omnis sit earum omnis.',
        time: '2w ago',
        user: users[1]
    },
]
export const products = [
    {
        image: appImages.product1,
        title: "Dark Grago",
        available_colors: ['black', 'silver', 'brown'],
        available_sizes: ['small', 'large'],
        price: '70.00',
        rating: 4.4,
        reviews_count: '42',
        type: 'physical',
        category: 'hoodies'
    },
    {
        image: appImages.product2,
        title: "Adidas Hoodie",
        available_colors: ['black', 'silver', 'brown'],
        available_sizes: ['small', 'large', 'XL'],
        price: '85.50',
        rating: 4.6,
        reviews_count: '24',
        type: 'physical',
        category: 'hoodies'
    }
]
export const audio_books = [
    {
        image: appImages.audio_book_1,
        title: "Audio Book Name",
        price: '70.00',
        rating: 4.4,
        reviews_count: '42',
        type: 'digital',
        category: 'audioBook'
    },
    {
        image: appImages.audio_book_2,
        title: "Audio Book Name",
        price: '85.50',
        rating: 4.6,
        reviews_count: '24',
        type: 'digital',
        category: 'audioBook'
    },
    {
        image: appImages.audio_book_3,
        title: "Audio Book Name",
        price: '67.00',
        rating: 4.7,
        reviews_count: '67',
        type: 'digital',
        category: 'audioBook'
    },
]
export const comics = [
    {
        image: appImages.comic_2,
        title: "Comic Name",
        price: '85.50',
        rating: 4.6,
        reviews_count: '24',
        type: 'digital',
        category: 'comic'
    },
    {
        image: appImages.comic_1,
        title: "Comic Name",
        price: '70.00',
        rating: 4.4,
        reviews_count: '42',
        type: 'digital',
        category: 'comic'
    },

    {
        image: appImages.comic_3,
        title: "Comic Name",
        price: '67.00',
        rating: 4.7,
        reviews_count: '67',
        type: 'digital',
        category: 'comic'
    },
]
export const e_books = [
    {
        image: appImages.ebook_3,
        title: "E-Book Name",
        price: '67.00',
        rating: 4.7,
        reviews_count: '67',
        type: 'digital',
        category: 'eBook'
    },
    {
        image: appImages.ebook_1,
        title: "E-Book Name",
        price: '85.50',
        rating: 4.6,
        reviews_count: '24',
        type: 'digital',
        category: 'eBook'
    },
    {
        image: appImages.ebook_2,
        title: "E-Book Name",
        price: '70.00',
        rating: 4.4,
        reviews_count: '42',
        type: 'digital',
        category: 'eBook'
    },
]
export const supportPackages = [
    {
        title: 'APPLICANT',
        image: appImages.product2,
        amount: '1',
        interval: 'PER MONTH',
        description: 'You are greatly appreciated! In fact, you rock! *All rewards come with lifelong appreciation'
    },
    {
        title: 'PATCH',
        image: appImages.product4,
        amount: '2',
        interval: 'PER MONTH',
        description: 'High fiving you in spirit! *All rewards come with lifelong appreciation'
    },
    {
        title: 'Member',
        image: appImages.product5,
        amount: '5',
        interval: 'PER MONTH',
        description: 'We do a RUNNING high five... (also in spirit) *All rewards come with lifelong appreciation'
    }
]
export const reviews = [
    {
        user: users[0],
        rating: 4.5,
        comment: "This is quickly growing into a favorite series of mine, and thats saying a lot with how much i read. Each book is well written with great stories and depth carved into the characters. Some parts really hit me in the feels like no book ever has. And it only gets better as ot gpes on. I'm keem to see whats next. 😁 good work bud!",
        date: '2 days ago'
    },
    {
        user: users[2],
        rating: 4.3,
        comment: "Thats saying a lot with how much i read. Each book is well written with great stories and depth carved into the characters. Some parts really hit me in the feels like no book ever has. And it only gets better as ot gpes on. I'm keem to see whats next. 😁 good work bud!",
        date: '3 days ago'
    }
]
export const products_seller = [
    {
        image: appImages.product3,
        typee: product_typees.active,
        label: 'Short Sleeve T-Shirt',
        inventory: '20 in Stock',
        type: product_categories[0].value,
        vendor: 'Astore'
    },
    {
        image: appImages.product4,
        typee: product_typees.active,
        label: 'Casual Shoes',
        inventory: '24 in Stock',
        type: product_categories[0].value,
        vendor: 'Gblock'
    },
    {
        image: appImages.product5,
        typee: product_typees.active,
        label: 'Mask Jungle Style',
        inventory: '10 in Stock',
        type: product_categories[0].value,
        vendor: 'AlNoor'
    }
]
export const orders_seller = [
    {
        order_no: '568',
        date: '23/04/2022',
        items: '3',
        status: order_statuses.pending,
        price: '1,120.00',
        is_paid: true,
        is_fulfilled: true,
        is_draft: false,
        customer_name: 'John Doe'
    },
    {
        order_no: '459',
        date: '23/04/2022',
        items: '5',
        status: order_statuses.delivered,
        price: '1,355.00',
        is_paid: true,
        is_fulfilled: true,
        is_draft: false,
        customer_name: 'John Doe'
    },
    {
        order_no: '775',
        date: '23/04/2022',
        items: '2',
        status: order_statuses.cancelled,
        price: '2,430.00',
        is_paid: true,
        is_fulfilled: true,
        is_draft: false,
        customer_name: 'John Doe',
    },
    {
        order_no: '775',
        date: '23/04/2022',
        items: '2',
        status: order_statuses.cancelled,
        price: '2,430.00',
        is_paid: true,
        is_fulfilled: true,
        is_draft: true,
        customer_name: 'John Doe',
    }
]
export const customers_seller = [
    {
        name: 'John Doe',
        spent: '800',
        email: 'john11@gmail.com',
        phone_number: '+123 456 789',
        status: 'active',
    },
    {
        name: 'Amile Wilson',
        spent: '550',
        email: 'ami@gmail.com',
        phone_number: '+123 456 789',
        status: 'active',
    },
    {
        name: 'John Doe',
        spent: '800',
        email: 'john11@gmail.com',
        phone_number: '+123 456 789',
        status: 'active',
    }
]

export const  picker_options = [
    { label: 'Option 1', value: 'option 1' },
    { label: 'Option 2', value: 'option 2' },
    { label: 'Option 3', value: 'option 3' },
    { label: 'Option 4', value: 'option 4' },
]