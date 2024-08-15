const Product = require("../models/productModel");

const ProductSeeder = async () => {
    // reset collection
    await Product.deleteMany({});
    const categories = [
        "men",
        "women",
        "footwear",
        "accessories",
        "sale",
        "new-arrivals",
        "best-sellers",
    ];

    const products = [];

    const images = [
        "https://i.pinimg.com/474x/c8/89/8c/c8898c00cabd7d1b5f3595067fb06d61.jpg",
        "https://i.pinimg.com/236x/d0/99/11/d0991122b62e5fed36f8fa7cf2a085cb.jpg",
        "https://i.pinimg.com/236x/04/07/5f/04075f93e8d58c31bead68971d885d8c.jpg",
        "https://i.pinimg.com/236x/c1/a0/61/c1a061df59d159eaced10f35dcff1993.jpg",
        "https://i.pinimg.com/236x/cf/b2/da/cfb2da69f13939d84812d199bd620ec5.jpg",

        "https://i.pinimg.com/236x/d4/30/7c/d4307c48e0d52604df2498292d0aeadd.jpg",
        "https://i.pinimg.com/236x/60/7b/8c/607b8c1bcbc63d03f52f1337ceca58a9.jpg",
        "https://i.pinimg.com/236x/db/71/a4/db71a42c0539bac123caa3b13c729ff7.jpg",
        "https://i.pinimg.com/236x/d5/82/50/d58250f83a66c36a6c7e8e7d52f2c261.jpg",
        "https://i.pinimg.com/236x/ec/dd/45/ecdd457626c2f4958ada88fda050a084.jpg",

        "https://i.pinimg.com/236x/d1/24/0d/d1240d84aa49a401b8aa02924fa41039.jpg",
        "https://i.pinimg.com/236x/39/af/f2/39aff2691751ea79a501956858e0775c.jpg",
        "https://i.pinimg.com/236x/6a/9b/d4/6a9bd4a5b02225c9f6b68f76d57caa93.jpg",
        "https://i.pinimg.com/236x/13/e0/3c/13e03c38419f8e45f23a2d0b4c1f188a.jpg",
        "https://i.pinimg.com/236x/5b/11/69/5b11699c96f6cd53842588413d025c10.jpg",

        "https://i.pinimg.com/236x/e4/ce/41/e4ce41e6f71bcc881c222e13f8de69e6.jpg",
        "https://i.pinimg.com/236x/90/81/31/9081319d3d8d9c1be813dc667e5dd480.jpg",
        "https://i.pinimg.com/236x/db/af/5c/dbaf5c036e099c6c39a2c50669a772ee.jpg",
        "https://i.pinimg.com/236x/6b/f9/7d/6bf97dab5c30adef60eb1df7a8d0dac5.jpg",
        "https://i.pinimg.com/236x/48/e0/4b/48e04bdc90737be5f379e02563df26e5.jpg",

        "https://i.pinimg.com/236x/d5/82/50/d58250f83a66c36a6c7e8e7d52f2c261.jpg",
        "https://i.pinimg.com/236x/5b/11/69/5b11699c96f6cd53842588413d025c10.jpg",
        "https://i.pinimg.com/236x/cf/b2/da/cfb2da69f13939d84812d199bd620ec5.jpg",
        "https://i.pinimg.com/236x/6a/9b/d4/6a9bd4a5b02225c9f6b68f76d57caa93.jpg",
        "https://i.pinimg.com/236x/90/81/31/9081319d3d8d9c1be813dc667e5dd480.jpg",

        "https://i.pinimg.com/474x/c8/89/8c/c8898c00cabd7d1b5f3595067fb06d61.jpg",
        "https://i.pinimg.com/236x/e4/ce/41/e4ce41e6f71bcc881c222e13f8de69e6.jpg",
        "https://i.pinimg.com/236x/d1/24/0d/d1240d84aa49a401b8aa02924fa41039.jpg",
        "https://i.pinimg.com/236x/cf/b2/da/cfb2da69f13939d84812d199bd620ec5.jpg",
        "https://i.pinimg.com/236x/13/e0/3c/13e03c38419f8e45f23a2d0b4c1f188a.jpg",

        "https://i.pinimg.com/236x/db/71/a4/db71a42c0539bac123caa3b13c729ff7.jpg",
        "https://i.pinimg.com/236x/d5/82/50/d58250f83a66c36a6c7e8e7d52f2c261.jpg",
        "https://i.pinimg.com/236x/d1/24/0d/d1240d84aa49a401b8aa02924fa41039.jpg",
        "https://i.pinimg.com/236x/60/7b/8c/607b8c1bcbc63d03f52f1337ceca58a9.jpg",
        "https://i.pinimg.com/236x/d0/99/11/d0991122b62e5fed36f8fa7cf2a085cb.jpg",
    ];

    for (let j = 0; j < categories.length; j++) {
        for (let i = 1; i <= 5; i++) {
            const imageIndex = (j * 5 + i - 1) % images.length;
            products.push({
                name: `${categories[j]} Product ${i}`,
                imageUrl: images[imageIndex],
                price: (Math.random() * 100).toFixed(2),
                description: `Description for ${categories[j]} Product ${i}`,
                colors: ["Red", "Blue", "Green"],
                category: categories[j],
                sizes: ["S", "M", "L", "XL"],
                onSale: categories[j] === "Sale",
                salePrice:
                    categories[j] === "Sale"
                        ? (Math.random() * 50).toFixed(2)
                        : 0,
                ratings: (Math.random() * 5).toFixed(1),
                dateAdded: new Date(),
            });
        }
    }

    await Product.insertMany(products);
    console.log("Product seeding done.");
};

module.exports = { ProductSeeder };
