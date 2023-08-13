class NaiveBayes {
    constructor() {
        this.total_samples = 0;
        this.total_tokens = 0;
        this.subjects = {};
        this.tokens = {};
    }

    classify(str) {
        if (this.total_samples === 0) {
            return {};
        }

        const tokens = this.tokenize(str);
        const scores = {};
        let total_score = 0;

        for (const subject in this.subjects) {
            const subject_data = this.subjects[subject];
            subject_data['prior_value'] = Math.log(subject_data['count_samples'] / this.total_samples);
            this.subjects[subject] = subject_data;
            scores[subject] = 0;

            for (const token of tokens) {
                const count = this.tokens[token]?.[subject] || 0;
                scores[subject] += Math.log((count + 1) / (subject_data['count_tokens'] + this.total_tokens));
            }

            scores[subject] = subject_data['prior_value'] + scores[subject];
            total_score += scores[subject];
        }

        let min = Infinity;
        for (const score of Object.values(scores)) {
            min = Math.min(min, score);
        }

        let sum = 0;
        for (const subject in scores) {
            scores[subject] = Math.exp(scores[subject] - min);
            sum += scores[subject];
        }

        if (sum > 0) {
            for (const subject in scores) {
                scores[subject] /= sum;
            }
        } else {
            const numCategories = Object.keys(scores).length;
            const defaultProbability = 1 / numCategories;
            const totalDefaultProbability = defaultProbability * numCategories;

            for (const subject in scores) {
                scores[subject] = defaultProbability;
            }

            const remainingProbability = 1 - totalDefaultProbability;
            const additionalProbability = remainingProbability / numCategories;

            for (const subject in scores) {
                scores[subject] += additionalProbability;
            }
        }

        const sortedScores = Object.fromEntries(Object.entries(scores).sort((a, b) => b[1] - a[1]));
        return sortedScores;
    }

    tokenize(str) {
        const cleanedStr = this.clean(str);
        const matches = cleanedStr.match(/\w+/g);
        return matches ? matches : [];
    }

    clean(str) {
        const cleanedStr = str
            .toLowerCase()
            .replace(/á|à|ã|â|ä/g, 'a')
            .replace(/é|è|ê|ë/g, 'e')
            .replace(/í|ì|î|ï/g, 'i')
            .replace(/ó|ò|õ|ô|ö/g, 'o')
            .replace(/ú|ù|û|ü/g, 'u')
            .replace(/ñ/g, 'n')
            .replace(/Á|À|Ã|Â|Ä/g, 'A')
            .replace(/É|È|Ê|Ë/g, 'E')
            .replace(/Í|Ì|Î|Ï/g, 'I')
            .replace(/Ó|Ò|Õ|Ô|Ö/g, 'O')
            .replace(/Ú|Ù|Û|Ü/g, 'U')
            .replace(/Ñ/g, 'N');
        return cleanedStr;
    }

    train(subject, rows) {
        if (!this.subjects[subject]) {
            this.subjects[subject] = {
                count_samples: 0,
                count_tokens: 0,
                prior_value: null,
            };
        }

        if (!Array.isArray(rows)) {
            rows = [rows];
        }

        for (const row of rows) {
            this.total_samples++;
            this.subjects[subject]['count_samples']++;

            const tokens = this.tokenize(row);

            for (const token of tokens) {
                if (!this.tokens[token]?.[subject]) {
                    this.tokens[token] = { ...this.tokens[token], [subject]: 0 };
                }

                this.tokens[token][subject]++;
                this.subjects[subject]['count_tokens']++;
                this.total_tokens++;
            }
        }
    }

    saveModel() {
        return JSON.stringify(this);
    }
}
