// Mock data for Unique Vintage clone
// Images reference original Shopify CDN URLs

export const announcementMessages = [
  '30% Off Sitewide ends in',
  'Free Shipping on Orders $150+',
  'New Arrivals Drop Every Week',
];

export const navMenu = [
  {
    label: 'New',
    href: '/collections/new-arrivals',
    columns: [
      { title: 'New Arrivals', links: ['All New Arrivals', 'New Dresses', 'New Tops', 'New Shoes', 'New Accessories', 'Just Restocked'] },
      { title: 'Collections', links: ['Americana Collection', 'Western Collection', 'Pride Collection', 'Swim 2026'] },
    ],
    feature: { title: 'New Arrivals', image: 'https://www.unique-vintage.com/cdn/shop/files/02-2026-Homepage-Category-Banners-bestsellers.webp?v=1770407376&width=1200', href: '/collections/new-arrivals' },
  },
  {
    label: 'Dresses',
    href: '/collections/dresses',
    columns: [
      { title: 'By Style', links: ['Fit & Flare', 'Swing Dresses', 'Pencil Dresses', 'Maxi Dresses', 'Midi Dresses', 'Mini Dresses', 'Wrap Dresses', 'Flapper Dresses'] },
      { title: 'By Occasion', links: ['Cocktail', 'Bridesmaids', 'Holiday', 'Workwear', 'Casual'] },
      { title: 'By Era', links: ['1920s', '1940s', '1950s', '1960s', '1970s'] },
    ],
    feature: { title: 'Best of Dresses', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-50s.jpg?v=1734546424&width=1200', href: '/collections/dresses' },
  },
  {
    label: 'Clothing',
    href: '/collections/clothing',
    columns: [
      { title: 'Tops', links: ['Blouses', 'Sweaters', 'Cardigans', 'Graphic Tees', 'Crop Tops'] },
      { title: 'Bottoms', links: ['Skirts', 'Pants', 'Shorts', 'Jeans'] },
      { title: 'Outerwear', links: ['Jackets', 'Coats', 'Cardigans'] },
      { title: 'Other', links: ['Rompers & Jumpsuits', 'Swimwear', 'Lingerie', 'Petticoats'] },
    ],
    feature: { title: 'Shop Tops', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-60s.jpg?v=1734546424&width=1200', href: '/collections/clothing' },
  },
  {
    label: 'Shoes',
    href: '/collections/shoes',
    columns: [
      { title: 'By Style', links: ['Heels', 'Flats', 'Sandals', 'Boots', 'Mules', 'T-Straps'] },
      { title: 'By Era', links: ['1920s Heels', '1940s Wedges', '1950s Saddle Shoes'] },
    ],
    feature: { title: 'Shop Shoes', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-90s.jpg?v=1734546424&width=1200', href: '/collections/shoes' },
  },
  {
    label: 'Accessories',
    href: '/collections/accessories',
    columns: [
      { title: 'Handbags', links: ['Crossbody', 'Clutches', 'Novelty', 'Wallets'] },
      { title: 'Hair', links: ['Hair Clips', 'Headbands', 'Scarves'] },
      { title: 'Jewelry', links: ['Necklaces', 'Earrings', 'Bracelets'] },
      { title: 'More', links: ['Sunglasses', 'Hats', 'Gloves', 'Belts'] },
    ],
    feature: { title: 'Accessorize', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-30s.jpg?v=1734546424&width=1200', href: '/collections/accessories' },
  },
  {
    label: 'Plus Size',
    href: '/collections/plus-size-clothing',
    columns: [
      { title: 'Plus Size', links: ['Plus Dresses', 'Plus Tops', 'Plus Bottoms', 'Plus Swim', 'Plus Outerwear'] },
    ],
    feature: { title: 'Plus Size', image: 'https://www.unique-vintage.com/cdn/shop/files/02-2026-Homepage-Category-Banners-Plus.webp?v=1770407377&width=1200', href: '/collections/plus-size-clothing' },
  },
  {
    label: 'Collabs',
    href: '/collections/collabs',
    columns: [
      { title: 'Featured', links: ['Disney Collection', 'Barbie Collection', 'Elvira x UV', 'Polly Pocket', 'Rainbow Brite', 'Winnie The Pooh'] },
    ],
    feature: { title: 'Disney Collection', image: 'https://www.unique-vintage.com/cdn/shop/files/02-2026-Homepage-Category-Banners-disney.webp?v=1770407378&width=1200', href: '/collections/disney-collections-by-unique-vintage' },
  },
  {
    label: 'Sale',
    href: '/collections/sale',
    columns: [
      { title: 'Shop Sale', links: ['All Sale', '50% Off', '60% Off', '70% Off', 'Final Sale'] },
    ],
    feature: { title: 'Up to 70% Off', image: 'https://www.unique-vintage.com/cdn/shop/files/05-16-americana-red-white-blue-homepage-banner-1-1.webp?v=1778879012&width=1200', href: '/collections/sale' },
  },
  {
    label: 'Bridal',
    href: '/collections/bridal',
    columns: [
      { title: 'Wedding', links: ['Wedding Dresses', 'Bridesmaids', 'Bridal Shoes', 'Honeymoon', 'Bachelorette'] },
    ],
    feature: { title: 'Bridal Lookbook', image: 'https://www.unique-vintage.com/cdn/shop/files/1920s_954b735e-df8d-4fb0-a66b-24cddd7d902d.jpg?v=1723507792&width=1200', href: '/collections/bridal' },
  },
];

export const heroBanners = [
  {
    id: 'hero-1',
    image: 'https://www.unique-vintage.com/cdn/shop/files/05-25-memorial-day-sale-40-off-sitewide-last-day-homepage-banner-1-1.webp?v=1779477549&width=1920',
    title: '30% Off Sitewide',
    subtitle: 'Last Day to Shop',
    cta: 'Shop Now',
    href: '/collections/new-arrivals',
  },
  {
    id: 'hero-2',
    image: 'https://www.unique-vintage.com/cdn/shop/files/05-12-pride-launch-sitewide-homepage-banner-1-1.webp?v=1778279693&width=1920',
    title: 'New Pride Collection',
    subtitle: 'Infinite Shades of You',
    cta: 'Shop Pride',
    href: '/collections/pride',
  },
];

export const categoryBanners = [
  { title: 'bestsellers', image: 'https://www.unique-vintage.com/cdn/shop/files/02-2026-Homepage-Category-Banners-bestsellers.webp?v=1770407376&width=1200', href: '/collections/bestsellers' },
  { title: 'Elvira x unique vintage', image: 'https://www.unique-vintage.com/cdn/shop/files/02-2026-Homepage-Category-Banners-elvira.webp?v=1770407378&width=1200', href: '/collections/elvira-x-unique-vintage' },
  { title: 'disney collections', image: 'https://www.unique-vintage.com/cdn/shop/files/02-2026-Homepage-Category-Banners-disney.webp?v=1770407378&width=1200', href: '/collections/disney-collections-by-unique-vintage' },
  { title: 'barbie x unique vintage', image: 'https://www.unique-vintage.com/cdn/shop/files/03-2026-Homepage-Category-Banners-Barbie.webp?v=1773081324&width=1200', href: '/collections/the-barbie-collection' },
  { title: 'plus size clothing', image: 'https://www.unique-vintage.com/cdn/shop/files/02-2026-Homepage-Category-Banners-Plus.webp?v=1770407377&width=1200', href: '/collections/plus-size-clothing' },
  { title: 'shop kitschy prints', image: 'https://www.unique-vintage.com/cdn/shop/files/02-2026-Homepage-Category-Banners-Kitsch.webp?v=1770407379&width=1200', href: '/collections/kitschy-prints' },
];

export const splitBanners = [
  { image: 'https://www.unique-vintage.com/cdn/shop/files/05-16-americana-red-white-blue-homepage-banner-1-1.webp?v=1778879012&width=1200', title: 'All American Sweetheart', cta: 'Shop Now', href: '/collections/the-americana-collection' },
  { image: 'https://www.unique-vintage.com/cdn/shop/files/04-23-western-homepage-banner-1-1_1.webp?v=1776901878&width=1200', title: 'New Western Collection', cta: 'Shop Now', href: '/collections/western' },
];

export const eras = [
  { name: '1920s', image: 'https://www.unique-vintage.com/cdn/shop/files/1920s_954b735e-df8d-4fb0-a66b-24cddd7d902d.jpg?v=1723507792&width=800', href: '/collections/1920s' },
  { name: '1930s', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-30s.jpg?v=1734546424&width=800', href: '/collections/shop-by-era-1930s' },
  { name: '1940s', image: 'https://www.unique-vintage.com/cdn/shop/files/1940s_6ab12a9e-5700-4c7c-943e-a08741a3aafd.jpg?v=1723507792&width=800', href: '/collections/shop-by-era-1940s' },
  { name: '1950s', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-50s.jpg?v=1734546424&width=800', href: '/collections/shop-by-era-1950s' },
  { name: '1960s', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-60s.jpg?v=1734546424&width=800', href: '/collections/shop-by-era-1960s' },
  { name: '1970s', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-70s.jpg?v=1734546424&width=800', href: '/collections/shop-by-era-1970s' },
  { name: '1980s', image: 'https://www.unique-vintage.com/cdn/shop/files/1980s_8f4c5f43-8bd5-4728-bdac-7541c27b3b92.jpg?v=1723507792&width=800', href: '/collections/shop-by-era-1980s' },
  { name: '1990s', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-90s.jpg?v=1734546424&width=800', href: '/collections/shop-by-era-1990s' },
  { name: 'Y2K', image: 'https://www.unique-vintage.com/cdn/shop/files/Homepage-Shop-Eras-y2k.jpg?v=1734546424&width=800', href: '/collections/y2k-clothing-accessories' },
];

export const promoSplits = [
  { image: 'https://www.unique-vintage.com/cdn/shop/files/04-03-Swim-homepage-banner-1-1_copy.webp?v=1775168858&width=1200', title: 'Shimmer in New Swim', cta: 'Shop Now', href: '/collections/swim-html' },
  { image: 'https://www.unique-vintage.com/cdn/shop/files/04-22-Treet-Launch-evergreen-homepage-banner-1-1.webp?v=1777474832&width=1200', title: 'Unique Vintage Revival', cta: 'Shop Pre-Loved', href: '/collections/revival' },
];

export const products = [
  { id: 'p1', slug: 'voodoo-vixen-teal-floral-bee-print-flare-dress', title: 'Voodoo Vixen Teal Floral & Bee Print Flare Dress', brand: 'Voodoo Vixen', price: 98, category: 'dresses', era: '1950s', color: 'Teal', images: [ 'https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-teal-floral-bee-print-flare-dress-7979114.jpg?v=1779595390', 'https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-teal-floral-bee-print-flare-dress-6237488.jpg?v=1779595390', 'https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-teal-floral-bee-print-flare-dress-7294416.jpg?v=1779595391', 'https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-teal-floral-bee-print-flare-dress-4988402.jpg?v=1779595391' ], sizes: ['XS','S','M','L','XL'], tags: ['new', 'dresses', 'fit and flare'], description: 'Buzz into spring with this whimsical fit-and-flare dress featuring an enchanting teal floral and bee print. Crafted from a comfortable woven fabric with a flattering sweetheart neckline and a swingy A-line skirt — perfect for picnics, parties, and pin-up posing.' },
  { id: 'p2', slug: 'rainbow-stripe-knee-high-socks', title: 'Rainbow Stripe Knee High Socks', brand: 'Unique Vintage', price: 14, category: 'accessories', era: 'Y2K', color: 'Rainbow', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/rainbow-stripe-knee-high-socks-8882995.jpg?v=1779595387'], sizes: ['One Size'], tags: ['accessories'], description: 'Add a bright pop of color with these cheerful rainbow stripe knee high socks. A retro essential, soft and stretchy for all-day comfort.' },
  { id: 'p3', slug: 'green-gingham-ruffle-tamara-top', title: 'Green Gingham Ruffle Tamara Top', brand: 'Unique Vintage', price: 68, category: 'tops', era: '1950s', color: 'Green', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/green-gingham-ruffle-tamara-top-9153772.jpg?v=1779595391', 'https://cdn.shopify.com/s/files/1/2714/9310/files/green-gingham-ruffle-tamara-top-8407079.jpg?v=1779595391', 'https://cdn.shopify.com/s/files/1/2714/9310/files/green-gingham-ruffle-tamara-top-7879776.jpg?v=1779595391'], sizes: ['XS','S','M','L','XL'], tags: ['new','tops'], description: 'Picnic perfection! This green gingham Tamara top features delicate ruffles and a cinched waist for a sweet, vintage silhouette.' },
  { id: 'p4', slug: 'plus-size-green-gingham-ruffle-tamara-top', title: 'Plus Size Green Gingham Ruffle Tamara Top', brand: 'Unique Vintage', price: 68, category: 'tops', era: '1950s', color: 'Green', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/plus-size-green-gingham-ruffle-tamara-top-7002131.jpg?v=1779595391','https://cdn.shopify.com/s/files/1/2714/9310/files/plus-size-green-gingham-ruffle-tamara-top-5668715.jpg?v=1779595391'], sizes: ['1X','2X','3X','4X'], tags: ['new','tops','plus'], description: 'Picnic perfection, plus-sized! Soft gingham fabric, ruffled detailing, perfect with denim or a flared midi skirt.' },
  { id: 'p5', slug: 'banned-green-secret-love-t-strap-leatherette-flats', title: 'Banned Green Secret Love T-Strap Leatherette Flats', brand: 'Banned', price: 68, category: 'shoes', era: '1940s', color: 'Green', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/banned-green-secret-love-t-strap-leatherette-flats-7814888.jpg?v=1779595390','https://cdn.shopify.com/s/files/1/2714/9310/files/banned-green-secret-love-t-strap-leatherette-flats-3970462.jpg?v=1779595390'], sizes: ['6','7','8','9','10'], tags: ['shoes','flats'], description: 'A vintage staple, these green T-strap flats are crafted from smooth leatherette and feature a cute decorative button accent.' },
  { id: 'p6', slug: 'voodoo-vixen-blue-nautical-button-flare-dress', title: 'Voodoo Vixen Blue Nautical Button Flare Dress', brand: 'Voodoo Vixen', price: 98, category: 'dresses', era: '1950s', color: 'Blue', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-blue-nautical-button-flare-dress-6609670.jpg?v=1779595391','https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-blue-nautical-button-flare-dress-9245850.jpg?v=1779595391','https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-blue-nautical-button-flare-dress-9176911.jpg?v=1779595391'], sizes: ['XS','S','M','L','XL'], tags: ['new','dresses'], description: 'Set sail in style with this nautical-inspired flare dress, featuring crisp navy stripes and a row of decorative buttons across the bodice.' },
  { id: 'p7', slug: 'unique-vintage-green-transparent-cat-eye-sunglasses', title: 'Unique Vintage Green Transparent Cat Eye Sunglasses', brand: 'Unique Vintage', price: 24, category: 'accessories', era: '1950s', color: 'Green', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/unique-vintage-green-transparent-cat-eye-sunglasses-1320622.jpg?v=1779595389','https://cdn.shopify.com/s/files/1/2714/9310/files/unique-vintage-green-transparent-cat-eye-sunglasses-9766529.jpg?v=1779595389'], sizes: ['One Size'], tags: ['accessories','sunglasses'], description: 'Channel mid-century glamour with these transparent green cat-eye sunglasses. UV400 protection, vintage attitude.' },
  { id: 'p8', slug: 'voodoo-vixen-grey-pinstripe-flare-dress', title: 'Voodoo Vixen Grey Pinstripe Flare Dress', brand: 'Voodoo Vixen', price: 98, category: 'dresses', era: '1940s', color: 'Grey', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-grey-pinstripe-flare-dress-5747459.jpg?v=1779595390','https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-grey-pinstripe-flare-dress-6607053.jpg?v=1779595390'], sizes: ['XS','S','M','L'], tags: ['dresses'], description: 'Pinstripe polish! A tailored grey flare dress that takes you effortlessly from desk to dinner.' },
  { id: 'p9', slug: 'banned-black-leatherette-peep-toe-kelly-heels', title: 'Banned Black Leatherette Peep Toe Kelly Heels', brand: 'Banned', price: 78, category: 'shoes', era: '1950s', color: 'Black', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/banned-black-leatherette-peep-toe-kelly-heels-6970320.jpg?v=1779595390','https://cdn.shopify.com/s/files/1/2714/9310/files/banned-black-leatherette-peep-toe-kelly-heels-7197179.jpg?v=1779595391'], sizes: ['6','7','8','9','10'], tags: ['shoes','heels'], description: 'Classic peep toe Kelly heels — a black leatherette must-have with a flattering ankle strap.' },
  { id: 'p10', slug: 'voodoo-vixen-pink-floral-cat-embroidered-sweater-vest', title: 'Voodoo Vixen Pink Floral Cat Embroidered Sweater Vest', brand: 'Voodoo Vixen', price: 58, category: 'tops', era: '1970s', color: 'Pink', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-pink-floral-cat-embroidered-sweater-vest-7780367.jpg?v=1779595391','https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-pink-floral-cat-embroidered-sweater-vest-9039901.jpg?v=1779595390'], sizes: ['XS','S','M','L'], tags: ['tops','sweater'], description: 'Adorable embroidered floral cat motifs on a cozy pink sweater vest. Pair with a button-down for full vintage charm.' },
  { id: 'p11', slug: 'banned-sky-blue-lily-rose-sweater', title: 'Banned Sky Blue Lily Rose Sweater', brand: 'Banned', price: 58, category: 'tops', era: '1950s', color: 'Sky Blue', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/banned-sky-blue-lily-rose-sweater-8975570.jpg?v=1779595391','https://cdn.shopify.com/s/files/1/2714/9310/files/banned-sky-blue-lily-rose-sweater-7720267.jpg?v=1779595390'], sizes: ['XS','S','M','L','XL'], tags: ['tops','sweater'], description: 'A breezy sky blue knit sweater with sweet lily-rose embroidery. Light and breathable for spring.' },
  { id: 'p12', slug: 'rainbow-hair-claw-clip', title: 'Rainbow Hair Claw Clip', brand: 'Unique Vintage', price: 18, category: 'accessories', era: 'Y2K', color: 'Rainbow', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/rainbow-hair-claw-clip-7423086.jpg?v=1779595391','https://cdn.shopify.com/s/files/1/2714/9310/files/rainbow-hair-claw-clip-4760462.jpg?v=1779595391'], sizes: ['One Size'], tags: ['accessories','hair'], description: 'A nostalgic Y2K rainbow claw clip. Perfect to tame your locks with a colorful pop.' },
  { id: 'p13', slug: 'smak-parlour-black-daisy-mod-mini-dress', title: 'Smak Parlour Black & Daisy Mod Mini Dress', brand: 'Smak Parlour', price: 68, category: 'dresses', era: '1960s', color: 'Black', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/smak-parlour-black-daisy-mod-mini-dress-9896030.jpg?v=1779595403','https://cdn.shopify.com/s/files/1/2714/9310/files/smak-parlour-black-daisy-mod-mini-dress-6261752.jpg?v=1779595403'], sizes: ['XS','S','M','L'], tags: ['dresses','mod'], description: 'Mod-mini madness in black with cheerful daisies. Channel your inner Twiggy.' },
  { id: 'p14', slug: 'unique-vintage-blue-gingham-strawberries-swing-dress', title: 'Unique Vintage Blue Gingham & Strawberries Swing Dress', brand: 'Unique Vintage', price: 128, category: 'dresses', era: '1950s', color: 'Blue', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/unique-vintage-blue-gingham-strawberries-swing-dress-5513158.jpg?v=1779595404','https://cdn.shopify.com/s/files/1/2714/9310/files/unique-vintage-blue-gingham-strawberries-swing-dress-6822213.jpg?v=1779595405'], sizes: ['XS','S','M','L','XL'], tags: ['new','dresses','swing'], description: 'A sweet swing dress in blue gingham with adorable strawberry embroidery. Full skirt twirls perfectly.' },
  { id: 'p15', slug: '1920s-light-blue-leatherette-t-strap-heels', title: '1920s Light Blue Leatherette T-Strap Heels', brand: 'Unique Vintage', price: 44, category: 'shoes', era: '1920s', color: 'Blue', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/1920s-light-blue-leatherette-t-strap-heels-7562406.jpg?v=1779595398'], sizes: ['6','7','8','9','10'], tags: ['shoes','heels','flapper'], description: 'Flapper-style T-strap heels in pretty light blue leatherette. Dance the Charleston in these.' },
  { id: 'p16', slug: 'voodoo-vixen-cream-cherry-floral-cardigan', title: 'Voodoo Vixen Cream Cherry Floral Cardigan', brand: 'Voodoo Vixen', price: 68, category: 'tops', era: '1950s', color: 'Cream', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-cream-cherry-floral-cardigan-6810011.jpg?v=1779595392','https://cdn.shopify.com/s/files/1/2714/9310/files/voodoo-vixen-cream-cherry-floral-cardigan-9810297.jpg?v=1779595392'], sizes: ['XS','S','M','L','XL'], tags: ['tops','cardigan'], description: 'Sweet cherries embroidered on a cream cardigan. The ultimate pin-up topper.' },
  { id: 'p17', slug: 'hell-bunny-strawberry-light-denim-shorts', title: 'Hell Bunny Strawberry & Light Denim Shorts', brand: 'Hell Bunny', price: 78, category: 'bottoms', era: '1990s', color: 'Blue', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/hell-bunny-strawberry-light-denim-shorts-2173086.jpg?v=1779469810','https://cdn.shopify.com/s/files/1/2714/9310/files/hell-bunny-strawberry-light-denim-shorts-1637988.jpg?v=1779469810'], sizes: ['XS','S','M','L','XL'], tags: ['bottoms','shorts'], description: 'Denim shorts dotted with embroidered strawberries — a sweet summer staple.' },
  { id: 'p18', slug: 'yellow-leatherette-raincoat-puppy-crossbody-bag', title: 'Yellow Leatherette Raincoat Puppy Crossbody Bag', brand: 'Unique Vintage', price: 78, category: 'accessories', era: 'Y2K', color: 'Yellow', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/yellow-leatherette-raincoat-puppy-crossbody-bag-8178340.jpg?v=1779595394','https://cdn.shopify.com/s/files/1/2714/9310/files/yellow-leatherette-raincoat-puppy-crossbody-bag-7971446.jpg?v=1779595394'], sizes: ['One Size'], tags: ['accessories','bag','novelty'], description: 'A cheeky novelty crossbody shaped like a puppy in a yellow raincoat. Carry the cuteness.' },
  { id: 'p19', slug: 'pink-denim-high-waisted-jeans', title: 'Pink Denim High Waisted Jeans', brand: 'Unique Vintage', price: 68, category: 'bottoms', era: '1990s', color: 'Pink', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/pink-denim-high-waisted-jeans-7310493.jpg?v=1779595396','https://cdn.shopify.com/s/files/1/2714/9310/files/pink-denim-high-waisted-jeans-8421815.jpg?v=1779595397'], sizes: ['2','4','6','8','10','12'], tags: ['bottoms','jeans'], description: 'High-waisted pink denim with a vintage flare leg. Comfort meets cool.' },
  { id: 'p20', slug: 'rainbow-crochet-open-cardigan', title: 'Rainbow Crochet Open Cardigan', brand: 'Unique Vintage', price: 88, category: 'tops', era: '1970s', color: 'Rainbow', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/rainbow-crochet-open-cardigan-9349755.jpg?v=1779595398','https://cdn.shopify.com/s/files/1/2714/9310/files/rainbow-crochet-open-cardigan-5494272.jpg?v=1779595398'], sizes: ['XS','S','M','L'], tags: ['tops','cardigan','crochet'], description: 'A nostalgic open-front crochet cardigan in cheerful rainbow stripes. Bohemian dream.' },
  { id: 'p21', slug: 'black-piano-crossbody-bag', title: 'Black Piano Crossbody Bag', brand: 'Unique Vintage', price: 88, category: 'accessories', era: '1950s', color: 'Black', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/black-piano-crossbody-bag-9629847.jpg?v=1779595390','https://cdn.shopify.com/s/files/1/2714/9310/files/black-piano-crossbody-bag-5086450.jpg?v=1779595390'], sizes: ['One Size'], tags: ['accessories','bag','novelty'], description: 'A novelty crossbody bag shaped like a tiny piano. For the rockabilly heart.' },
  { id: 'p22', slug: 'twin-cherries-hair-clip', title: 'Twin Cherries Hair Clip', brand: 'Unique Vintage', price: 20, category: 'accessories', era: '1950s', color: 'Red', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/twin-cherries-hair-clip-2086400.jpg?v=1779595400','https://cdn.shopify.com/s/files/1/2714/9310/files/twin-cherries-hair-clip-2073195.jpg?v=1779595400'], sizes: ['One Size'], tags: ['accessories','hair'], description: 'Twin red cherries adorn this charming hair clip. A retro pin-up staple.' },
  { id: 'p23', slug: 'banned-green-polly-floral-collar-cardigan', title: 'Banned Green Polly Floral Collar Cardigan', brand: 'Banned', price: 68, category: 'tops', era: '1950s', color: 'Green', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/banned-green-polly-floral-collar-cardigan-9186002.jpg?v=1779595388','https://cdn.shopify.com/s/files/1/2714/9310/files/banned-green-polly-floral-collar-cardigan-7579954.jpg?v=1779595388'], sizes: ['XS','S','M','L'], tags: ['tops','cardigan'], description: 'A sage green cardigan with floral collar embroidery — sweet, soft, and oh-so-charming.' },
  { id: 'p24', slug: 'yellow-gingham-bow-sandals', title: 'Yellow Gingham Bow Sandals', brand: 'Unique Vintage', price: 32, category: 'shoes', era: '1950s', color: 'Yellow', images: ['https://cdn.shopify.com/s/files/1/2714/9310/files/yellow-gingham-bow-sandals-6966547.jpg?v=1779595395','https://cdn.shopify.com/s/files/1/2714/9310/files/yellow-gingham-bow-sandals-2956350.jpg?v=1779595395'], sizes: ['6','7','8','9'], tags: ['shoes','sandals'], description: 'Sunshine yellow gingham sandals with the cutest bow detail. Picnic-ready.' },
];

export const brandLogos = [
  { name: 'Refinery29', src: 'https://www.unique-vintage.com/cdn/shop/files/logo01.png?v=1682487304&width=300' },
  { name: 'Forbes', src: 'https://www.unique-vintage.com/cdn/shop/files/logo02.png?v=1682487304&width=300' },
  { name: 'Huffpost', src: 'https://www.unique-vintage.com/cdn/shop/files/logo03.png?v=1682487304&width=300' },
  { name: 'InStyle', src: 'https://www.unique-vintage.com/cdn/shop/files/logo04.png?v=1682487304&width=300' },
  { name: "L'Officiel", src: 'https://www.unique-vintage.com/cdn/shop/files/logo05.png?v=1682487304&width=300' },
  { name: 'BuzzFeed', src: 'https://www.unique-vintage.com/cdn/shop/files/logo06.png?v=1682487304&width=300' },
  { name: 'Vogue', src: 'https://www.unique-vintage.com/cdn/shop/files/logo07.png?v=1682487304&width=300' },
  { name: 'Fashion', src: 'https://www.unique-vintage.com/cdn/shop/files/logo08.png?v=1682487304&width=300' },
];

export const instagramPosts = [
  { id: 'i1', image: 'https://cdn.shopify.com/s/files/1/2714/9310/files/smak-parlour-black-rainbow-heart-chevron-midi-dress-4488963.jpg?v=1778432411', caption: 'This and online shopping. Use code MDW40', date: '24 MAY 2026' },
  { id: 'i2', image: 'https://cdn.shopify.com/s/files/1/2714/9310/files/smak-parlour-rainbow-stripe-heart-cutout-flare-dress-7455076.jpg?v=1778432411', caption: 'A little something for everyone. Use code MD40', date: '23 MAY 2026' },
  { id: 'i3', image: 'https://cdn.shopify.com/s/files/1/2714/9310/files/unique-vintage-pride-rainbow-stripe-hair-scarf-6520036.jpg?v=1778345714', caption: 'A special announcement, darlings.', date: '22 MAY 2026' },
  { id: 'i4', image: 'https://cdn.shopify.com/s/files/1/2714/9310/files/304245-K1603WD0_3.jpg?v=1778608561', caption: '7 days until the last petal drops.', date: '21 MAY 2026' },
  { id: 'i5', image: 'https://cdn.shopify.com/s/files/1/2714/9310/files/smak-parlour-black-rainbow-pleated-skirted-romper-2592061.jpg?v=1778345716', caption: 'Our midweek pick-me-up, courtesy of you.', date: '20 MAY 2026' },
  { id: 'i6', image: 'https://cdn.shopify.com/s/files/1/2714/9310/files/navy-blue-sailor-collar-swing-dress-4709323.png?v=1778773869', caption: 'Conquering the week one dramatic entrance at a time.', date: '19 MAY 2026' },
  { id: 'i7', image: 'https://cdn.shopify.com/s/files/1/2714/9310/files/frog-shark-unisex-ringer-graphic-tee-3490678.jpg?v=1778706920', caption: 'Yay or Nay?', date: '18 MAY 2026' },
  { id: 'i8', image: 'https://cdn.shopify.com/s/files/1/2714/9310/files/smak-parlour-plus-size-rainbow-stripe-heart-cutout-flare-dress-6151948.jpg?v=1778432414', caption: 'Your cart is waiting!', date: '18 MAY 2026' },
];

export const whyUs = [
  { icon: 'Heart', title: 'Women Owned', subtitle: '& Operated' },
  { icon: 'Sparkles', title: 'Size Inclusive', subtitle: 'Offering XS–5X' },
  { icon: 'Award', title: 'Over 1 Million', subtitle: 'Satisfied Customers' },
  { icon: 'PartyPopper', title: 'Celebrating 25', subtitle: 'Years in Business' },
];

export const footerLinks = {
  Shop: ['New Arrivals', 'Best Sellers', 'Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories', 'Plus Size', 'Sale'],
  Help: ['Contact Us', 'Shipping', 'Returns & Exchanges', 'Size Guide', 'Order Tracking', 'FAQ', 'Gift Cards'],
  About: ['Our Story', 'Press', 'Careers', 'Wholesale', 'Affiliates', 'Sustainability'],
  Connect: ['Instagram', 'TikTok', 'Pinterest', 'Facebook', 'YouTube'],
};
