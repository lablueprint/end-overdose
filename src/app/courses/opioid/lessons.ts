const lessons = [
    {
        title: 'What Are Opioids?',
        content: [
            {
                'Opioids bind to opioid receptors in the brain resulting in pain relief and pleasurable effects. When bound, opioids also control breathing and feelings of pain and stress.':
                    '',
                'Examples of opioids include codeine, morphine, oxycontin, fentanyl, Percocet, heroin, Vicodin, and methadone.':
                    '',
                'Over 100,000 deaths every year in the United States are related to overdoses, and the majority of overdoses result from synthetic opioids like fentanyl (CDC)':
                    '',
            },
        ],
    },
    {
        title: 'What Is Fentanyl?',
        content: [
            {
                text: 'Fentanyl is an opioid painkiller that can be used in medical settings for surgery or treating severe pain.',
                subpoints: [],
            },
            {
                text: 'Fentanyl has become increasingly found contaminating other substances manufactured and purchased outside of regulated settings.',
                subpoints: [
                    {
                        text: 'INNER1: The fentanyl often found mixed into other drugs is illegally manufactured, meaning there is no regulation of its strength which can make it extremely addictive and lethal.',
                        subpoints: [
                            {
                                text: 'INNER2: The fentanyl often found mixed into other drugs is illegally manufactured, meaning there is no regulation of its strength which can make it extremely addictive and lethal.',
                                subpoints: [],
                            },
                            {
                                text: 'Fentanyl is approximately 50-100 times stronger than morphine (NIDA).',
                                subpoints: [],
                            },
                        ],
                    },
                    {
                        text: 'Fentanyl is approximately 50-100 times stronger than morphine (NIDA).',
                        subpoints: [],
                    },
                ],
            },
            {
                video: {
                    title: 'What Is Naloxone?',
                    videoPath: 'https://www.youtube.com/watch?v=o2Tpws5C2Eg',
                    startTime: '00:00',
                    endTime: '5:00',
                },
            },
            {
                text: 'Fentanyl analogs are the different variations of fentanyl. They often have similar but different chemical structures and may be produced in illegal settings to increase strength compared to medical-grade fentanyl.',
                subpoints: [
                    {
                        text: 'On average it takes approximately 2mg of fentanyl for a person to overdose, but exact amount can depend on the analog of fentanyl ingested, the person’s tolerance to fentanyl/opioids, and the method of ingestion.',
                        subpoints: [],
                    },
                    {
                        text: 'For an individual who has no tolerance to opioids, a small dose of fentanyl can be extremely lethal.',
                        subpoints: [],
                    },
                ],
            },
            // video: {
            //     title: 'What Is Naloxone?',
            //     videoPath: 'https://www.youtube.com/watch?v=o2Tpws5C2Eg',
            //     startTime: '00:00',
            //     endTime: '05:00',
            // },
        ],
    },
    {
        title: 'What Is Naloxone?',
        video: {
            title: 'What Is Naloxone?',
            videoPath: 'https://youtu.be/dPS-F91Mkg0?si=HWYS1tzyzssmqhwo',
            startTime: '00:00',
            endTime: '05:00',
        },
        content: [
            {
                'Naloxone is a medication used to reverse an opioid overdose by restoring a person’s breathing within 2-3 minutes of administration.':
                    {
                        'Multiple doses may be needed if breathing does not restore 2-3 minutes after administering a dose.':
                            '',
                    },
                'Naloxone is the generic name for the medication that reverses opioid overdoses. Naloxone may come in the form of an intranasal spray or intramuscular injection using a medication vial and syringe. The intranasal spray version of naloxone is made by many different companies and is sometimes referred to by brand names like “Narcan”.':
                    {
                        'Different forms and brands of naloxone all accomplish the same goal of reversing the effects of an opioid overdose.':
                            '',
                    },
                'Naloxone’s effects are only temporary. Naloxone can wear off 30-90 minutes after administration, and a person may fall back into an overdose.':
                    {
                        'This is why it is always important to call 911 when you see someone overdosing, even if you plan to give them naloxone.':
                            '',
                    },
            },
        ],
    },
];

export default lessons;
