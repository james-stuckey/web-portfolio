export function generateLoremIpsum(paragraphs: number, sentencesPerParagraph: number, wordsPerSentence: number) {
    const loremWords = [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
        "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
        "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
        "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
        "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
        "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
        "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
        "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
    ];

    function getRandomWords(count: number) {
        let sentence = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * loremWords.length);
            sentence.push(loremWords[randomIndex]);
        }
        return sentence.join(" ");
    }

    function generateSentence() {
        const wordCount = Math.max(3, Math.floor(wordsPerSentence * (0.8 + Math.random() * 0.4))); // Add variability
        const sentence = getRandomWords(wordCount);
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
    }

    function generateParagraph() {
        let paragraph = [];
        for (let i = 0; i < sentencesPerParagraph; i++) {
            paragraph.push(generateSentence());
        }
        return paragraph.join(" ");
    }

    let loremIpsum = [];
    for (let i = 0; i < paragraphs; i++) {
        loremIpsum.push(generateParagraph());
    }

    return loremIpsum.join("\n\n");
}

