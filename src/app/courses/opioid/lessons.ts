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
                        text: 'The fentanyl often found mixed into other drugs is illegally manufactured, meaning there is no regulation of its strength which can make it extremely addictive and lethal.',
                        subpoints: [],
                    },
                    {
                        text: 'Fentanyl is approximately 50-100 times stronger than morphine (NIDA).',
                        subpoints: [],
                    },
                ],
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
        ],
    },
    {
        title: 'What Is Opioid Overdose?',
        content: [
            {
                text: 'When too many opioids are ingested or a combination of opioids and other substances are ingested, it can cause an overload of activity from opioid receptors in the brain. Due to the control opioids have over breathing, this can cause a person to enter respiratory depression.',
                subpoints: [
                    {
                        text: 'Respiratory depression is when breathing is too slow or shallow for the exchange of carbon dioxide and oxygen to occur, and it is the life-threatening symptom of opioid overdoses. The buildup of carbon dioxide and lack of oxygen can cause brain damage within 4 minutes, and this is soon followed by death.',
                        subpoints: [],
                    },
                ],
            },
        ],
    },
    {
        title: 'What Is Naloxone?',
        content: [
            {
                video: {
                    title: 'What Is Naloxone?',
                    videoPath:
                        'https://youtu.be/dPS-F91Mkg0?si=HWYS1tzyzssmqhwo',
                    startTime: '00:00',
                    endTime: '05:00',
                },
            },
            {
                text: 'Naloxone is a medication used to reverse an opioid overdose by restoring a person’s breathing within 2-3 minutes of administration.',
                subpoints: [
                    {
                        text: 'Multiple doses may be needed if breathing does not restore 2-3 minutes after administering a dose.',
                        subpoints: [],
                    },
                ],
            },
            {
                text: 'Naloxone is the generic name for the medication that reverses opioid overdoses. Naloxone may come in the form of an intranasal spray or intramuscular injection using a medication vial and syringe. The intranasal spray version of naloxone is made by many different companies and is sometimes referred to by brand names like “Narcan”.',
                subpoints: [
                    {
                        text: 'Different forms and brands of naloxone all accomplish the same goal of reversing the effects of an opioid overdose.',
                        subpoints: [],
                    },
                ],
            },
            {
                text: 'Naloxone’s effects are only temporary. Naloxone can wear off 30-90 minutes after administration, and a person may fall back into an overdose.',
                subpoints: [
                    {
                        text: 'This is why it is always important to call 911 when you see someone overdosing, even if you plan to give them naloxone.',
                        subpoints: [],
                    },
                ],
            },
        ],
    },
    {
        title: 'Recap',
        content: [
            {
                video: {
                    title: 'Jack Shows How to Respond to an Overdose',
                    videoPath:
                        'https://youtu.be/JKwhqIHMD1E?si=TnOTk5xM-IQrQSr7',
                    startTime: '00:00',
                    endTime: '05:00',
                },
            },
            {
                text: 'Let’s go over how to respond 1 more time…',
                subpoints: [
                    {
                        text: '1) Recognizing the symptoms',
                        subpoints: [
                            {
                                text: 'Pinpoint pupils, slowed/stopped breathing, unconsciousness/unresponsiveness',
                                subpoints: [],
                            },
                        ],
                    },
                    {
                        text: '2) Calling 911 & yelling for help',
                        subpoints: [
                            {
                                text: 'You are protected by the Good Samaritan Law!',
                                subpoints: [],
                            },
                        ],
                    },
                    {
                        text: '3) Administering naloxone',
                        subpoints: [
                            {
                                text: 'Administer doses every 2-3 minutes until the person begins breathing.',
                                subpoints: [],
                            },
                        ],
                    },
                    {
                        text: '4) Performing rescue breathing',
                        subpoints: [
                            {
                                text: 'Do this in between administering naloxone doses or if you don’t have any doses to administer.',
                                subpoints: [],
                            },
                        ],
                    },
                    {
                        text: '5) Placing the person in recovery position',
                        subpoints: [
                            {
                                text: 'Do this if the person begins breathing but is still unconscious',
                                subpoints: [],
                            },
                        ],
                    },
                ],
            },
            {
                text: 'Here are some other things to consider…',
                subpoints: [
                    {
                        text: 'Make sure the person overdosing gets to a hospital immediately. Naloxone wears off in 30-90 minutes. Try to stay with the person overdosing until emergency responders arrive.',
                        subpoints: [],
                    },
                    {
                        text: 'Naloxone has virtually NO effect on someone who is not overdosing. If you give it to someone accidentally, they will be fine, but make sure to keep your naloxone safe unless you are responding to an emergency,',
                        subpoints: [],
                    },
                    {
                        text: 'Naloxone can cause withdrawal symptoms which can make a person nauseous, irritable, and can cause cramps. It may also make the person want to take more drugs, but try not to let them.',
                        subpoints: [],
                    },
                ],
            },
        ],
    },
];

export default lessons;
