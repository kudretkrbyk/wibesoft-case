export type Review = {
  id: string
 
  name: string
  rating: number // 0..5 (4.5 destek)
  text: string
  postedAt: string // "August 14, 2023"
  verified?: boolean
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
   
    name: 'Samantha D.',
    rating: 4.5,
    verified: true,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    postedAt: 'August 14, 2023',
  },
  {
    id: 'r2',
    
    name: 'Alex M.',
    rating: 4.0,
    verified: true,
    text: "The t-shirt exceeded my expectations. The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    postedAt: 'August 15, 2023',
  },
  {
    id: 'r3',
   
    name: 'Ethan R.',
    rating: 3.5,
    verified: true,
    text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    postedAt: 'August 16, 2023',
  },
  {
    id: 'r4',
   
    name: 'Olivia P.',
    rating: 4.0,
    verified: true,
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    postedAt: 'August 17, 2023',
  },
  {
    id: 'r5',
   
    name: 'Liam K.',
    rating: 4.0,
    verified: true,
    text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It feels like wearing a piece of art that reflects my passion for both design and fashion.",
    postedAt: 'August 18, 2023',
  },
  {
    id: 'r6',
   
    name: 'Ava H.',
    rating: 4.5,
    verified: true,
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout make this shirt a conversation starter.",
    postedAt: 'August 19, 2023',
  },
]

