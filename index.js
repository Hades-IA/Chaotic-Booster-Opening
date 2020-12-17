


class Arithmetic {
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    chance(chance, penality = 0) {

        let randomNumber = this.getRandomIntInclusive(0, 100);

        if (randomNumber <= chance - penality) return true;

        return false;


    };
};


//function
async function start() {

    const rate = new Arithmetic();


    const cards = cardsJson;


    const cardsPromo = cards.filter(card => {
        let rarety = card.cardtype.filter(cardtype => cardtype.title === "promo");

        return rarety.length > 0;

    })

    // functions
    draw(false, true, 'alliance unraveled', 'attack');

    function draw(qtn, box = false, collection = false, Notype = false) {
        const packs = BoosterOpening(qtn, box, collection, Notype)
        const divDraw = document.querySelector("#id");
        let pack1 = packs.map(booster => booster.map(cards => cards.url));
        let makePack = () => {
            let html = '';

            pack1.forEach((cards) => {
                let imgHtml = ''
                cards.forEach(url => {
                    imgHtml += ` <img class="card" src="${url}" alt="">`;
                });

                html += `<div class="pack">${imgHtml}</div>`;

            });
            return html;
        }

        divDraw.innerHTML = `
<div>
<h1>
Hello Wrold
</h1>
<div class="openBoosters">
${makePack()}
</div>
</div>`;

    }

    function Booster(ultra = false, superrare = false, collection = false, Notype = false) {
        let cards = [];
        if (collection) {
            let { cardsCommom, cardsUncommom, cardsRare, cardsSuperRare, cardsUltraRare } = collectionFilter(collection, Notype);

            for (let i = 0; i < 4; i++) {
                let randomNum = rate.getRandomIntInclusive(0, cardsCommom.length - 1) || 0;
                cards.push(cardsCommom[randomNum]);
            };

            for (let i = 0; i < 3; i++) {
                let randomNum = rate.getRandomIntInclusive(0, cardsUncommom.length - 1) || 0;
                cards.push(cardsUncommom[randomNum]);
            };

            if (ultra) {
                cards.push(cardsUltraRare[rate.getRandomIntInclusive(0, cardsUltraRare.length - 1) || 0]);
                cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
                return cards;
            };

            if (superrare) {
                cards.push(cardsSuperRare[rate.getRandomIntInclusive(0, cardsSuperRare.length - 1) || 0]);
                cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
                return cards;
            };

            if (rate.chance(1)) {
                cards.push(cardsPromo[rate.getRandomIntInclusive(0, cardsPromo.length - 1) || 0]);

            };

            if (rate.chance(5)) {
                cards.push(cardsUltraRare[rate.getRandomIntInclusive(0, cardsUltraRare.length - 1) || 0]);
                cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
                return cards;
            };

            if (rate.chance(30)) {
                cards.push(cardsSuperRare[rate.getRandomIntInclusive(0, cardsSuperRare.length - 1) || 0]);
                cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
                return cards;
            };




            cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
            cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
            return cards;
        }

        for (let i = 0; i < 4; i++) {
            let randomNum = rate.getRandomIntInclusive(0, cardsCommom.length - 1) || 0;
            cards.push(cardsCommom[randomNum]);
        };

        for (let i = 0; i < 3; i++) {
            let randomNum = rate.getRandomIntInclusive(0, cardsUncommom.length - 1) || 0;
            cards.push(cardsUncommom[randomNum]);
        };

        if (ultra) {
            cards.push(cardsUltraRare[rate.getRandomIntInclusive(0, cardsUltraRare.length - 1) || 0]);
            cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
            return cards;
        };

        if (superrare) {
            cards.push(cardsSuperRare[rate.getRandomIntInclusive(0, cardsSuperRare.length - 1) || 0]);
            cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
            return cards;
        };

        if (rate.chance(1)) {
            cards.push(cardsPromo[rate.getRandomIntInclusive(0, cardsPromo.length - 1) || 0]);

        };

        if (rate.chance(5)) {
            cards.push(cardsUltraRare[rate.getRandomIntInclusive(0, cardsUltraRare.length - 1) || 0]);
            cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
            return cards;
        };

        if (rate.chance(30)) {
            cards.push(cardsSuperRare[rate.getRandomIntInclusive(0, cardsSuperRare.length - 1) || 0]);
            cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
            return cards;
        };




        cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
        cards.push(cardsRare[rate.getRandomIntInclusive(0, cardsRare.length - 1) || 0]);
        return cards;
    }

    function BoosterOpening(boostersNum = false, box = false, collection = false, Notype = false) {
        let boosters = boostersNum;
        let result = []
        if (box) {
            for (let i = 0; i < 24; i++) {
                if (i === 15) {

                    let superRare = 0;
                    let ultraRare = 0;
                    let cardsRoll = result.map(booster => booster.map(card => card.cardtype.filter(rarety =>
                        rarety.title == 'commom' ||
                        rarety.title == 'uncommon' || rarety.title == 'rare'
                        || rarety.title == 'super rare' || rarety.title == 'ultra rare')[0])

                    );

                    cardsRoll.forEach(booster => {
                        booster.forEach(rarety => {
                            if (rarety.title === 'super rare') superRare++
                            if (rarety.title === 'ultra rare') ultraRare++
                        })

                    });

                    if (superRare < 8) {
                        let min = 8 - superRare;
                        i = i + min;
                        for (let n = 0; n <= min; n++) {
                            result.push(Booster(false, true, collection, Notype))
                        };
                    };

                    if (ultraRare < 1) {
                        let min = 1 - ultraRare;
                        i = i + min;
                        for (let n = 0; n < min; n++) {
                            result.push(Booster(true, false, collection, Notype))
                        };

                    };

                    if (superRare >= 8 && ultraRare >= 1) {
                        result.push(Booster(false, false, collection, Notype))
                    };

                } else {
                    result.push(Booster(false, false, collection, Notype))
                }

            };
            return result;
        };
        if (boostersNum) {
            for (let i = 0; i < boosters; i++) {
                result.push(Booster(false, false, collection, Notype))
            };
            return result;
        };

    };

    function collectionFilter(collectionFilter = false, Notype = false) {
        if (Notype) {

            const cards = cardsJson.filter(card => {

                let collection = card.cardtype.filter(cardtype => cardtype.title === `${collectionFilter}`);
                let atk = card.cardtype.filter(cardtype => cardtype.title === `${Notype}`);

                return collection.length > 0 && atk.length === 0;


            })

            return raretyFilter(cards);
        } else {
            const cards = cardsJson.filter(card => {

                let collection = card.cardtype.filter(cardtype => cardtype.title === `${collectionFilter}`);

                return collection.length > 0;

            });
            return raretyFilter(cards);
        }

        function raretyFilter(cards) {
            const cardsCommom = cards.filter(card => {
                let rarety = card.cardtype.filter(cardtype => cardtype.title === "commom" && cardtype.title !== 'promo');

                return rarety.length > 0;

            })

            const cardsUncommom = cards.filter(card => {
                let rarety = card.cardtype.filter(cardtype => cardtype.title === "uncommon" && cardtype.title !== 'promo');

                return rarety.length > 0;

            })

            const cardsRare = cards.filter(card => {
                let rarety = card.cardtype.filter(cardtype => cardtype.title === "rare" && cardtype.title !== 'promo');

                return rarety.length > 0;

            })

            const cardsSuperRare = cards.filter(card => {
                let rarety = card.cardtype.filter(cardtype => cardtype.title === "super rare" && cardtype.title !== 'promo');

                return rarety.length > 0;

            })

            const cardsUltraRare = cards.filter(card => {
                let rarety = card.cardtype.filter(cardtype => cardtype.title === "ultra rare" && cardtype.title !== 'promo');

                return rarety.length > 0;

            })

            const cardsPromo = cards.filter(card => {
                let rarety = card.cardtype.filter(cardtype => cardtype.title === "promo");

                return rarety.length > 0;

            })

            return {
                cardsCommom,
                cardsUncommom,
                cardsRare,
                cardsSuperRare,
                cardsUltraRare,
                cardsPromo
            };
        }

    }

};
start();


//CriarJSON.Escrever("./emojis.json", emojilist)



