// Sample data for the game
import { Game, Scene, Character, Action, Choice, Line } from '@/types/Game';

const character1: Character = {
    name: 'NARCAT',
    avatar: '/character1.png',
};

// Scene 1: Initial Response
const line1_1: Line = {
    name: 'NARCAT',
    text: 'Oh no! That person looks like they are passed out. What should we do next?',
};

const choice1_1: Choice = {
    text: 'Look through their pockets for their ID',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Digging through someone\'s belongings wastes valuable time and isn\'t helpful in the moment. Your priority should be getting help, not searching them. Professionals will take care of this once they arrive on the scene.',
        },
    ],
};

const choice1_2: Choice = {
    text: 'Call 911 / Yell for Help',
    nextScene: 'scene2',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: If someone looks unconscious, they could be overdosing or having another serious medical emergency. Getting professional help on the way can save their life.',
        },
        {
            name: 'NARCAT',
            text: 'Great job! We should call for help then check for the opioid overdose triad, the three most common signs of an opioid overdose. What are those signs?',
        }
    ],
};

const choice1_3: Choice = {
    text: 'Leave the person alone',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Never leave someone who may be unconscious or overdosing. They could stop breathing or their condition could get worse quickly. Stay with them and get help immediately.',
        },
    ],
};

const choice1_4: Choice = {
    text: 'Try to give them food or water',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Giving food or water to someone who\'s unconscious can be dangerous—they might choke. In medical emergencies like an overdose, focus on getting help and checking their responsiveness, not giving them anything to eat or drink.',
        },
    ],
};

const action1: Action = {
    type: 'decision',
    question: 'What should you do first when you see someone who appears to be passed out?',
    choices: [choice1_1, choice1_2, choice1_3, choice1_4],
};

// Scene 2: Opioid Overdose Triad
const line2_1: Line = {
    name: 'NARCAT',
    text: 'Great job! We should call for help then check for the opioid overdose triad, the three most common signs of an opioid overdose. What are those signs?',
};

const choice2_1: Choice = {
    text: 'Unconsciousness, slowed or stopped breathing, and pinpoint pupils',
    nextScene: 'scene3',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: These are the key signs of an opioid overdose. Opioids slow down the nervous system, causing a person to become unconscious, breathe very slowly or stop breathing, and have very tiny (pinpoint) pupils.',
        },
        {
            name: 'NARCAT',
            text: 'That\'s right! Let\'s move onto checking for these signs. First, we should check for unconsciousness. How should we check?',
        }
    ],
};

const choice2_2: Choice = {
    text: 'Unconsciousness, rapid breathing, and pinpoint pupils',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Rapid breathing is not typical in an opioid overdose. Opioids slow down breathing, which is why it becomes dangerous. Pinpoint pupils and unconsciousness are correct, but the breathing part is wrong.',
        },
    ],
};

const choice2_3: Choice = {
    text: 'Unconsciousness, rapid breathing, and enlarged/dilated pupils',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'This combination doesn\'t match an opioid overdose. Enlarged pupils and rapid breathing could point to other drugs or medical issues, but not opioids. Opioid overdoses usually cause slowed breathing and pinpoint pupils.',
        },
    ],
};

const choice2_4: Choice = {
    text: 'Confusion, sweating, and normal breathing',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'These signs are not typical of an opioid overdose. Someone overdosing on opioids is usually unconscious and not breathing normally. Sweating and confusion might happen with other types of drug reactions, but not in the classic opioid overdose triad.',
        },
    ],
};

const action2: Action = {
    type: 'decision',
    question: 'What are the three signs of the opioid overdose triad?',
    choices: [choice2_1, choice2_2, choice2_3, choice2_4],
};

// Scene 3: Checking for Unconsciousness
const line3_1: Line = {
    name: 'NARCAT',
    text: 'That\'s right! Let\'s move onto checking for these signs. First, we should check for unconsciousness. How should we check?',
};

const choice3_1: Choice = {
    text: 'Check their pulse',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Checking the pulse helps you know if their heart is beating, but it doesn\'t tell you if they\'re unconscious. You still need to see if they respond to your voice or touch first.',
        },
    ],
};

const choice3_2: Choice = {
    text: 'Shake them intensely to see if they wake up',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Shaking someone hard can hurt them, especially if they\'ve fallen or overdosed. It\'s better to try gentle methods first, like speaking to them or using a safe physical stimulus like a sternal rub.',
        },
    ],
};

const choice3_3: Choice = {
    text: 'Say their name if you know it. Attempt to wake them gently, then use a slightly painful stimulus like a sternal rub or trapezius pinch if they don\'t respond',
    nextScene: 'scene4',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: These actions should cause some sort of reaction in someone who is just asleep. If the person doesn\'t respond, they are likely unconscious.',
        },
        {
            name: 'NARCAT',
            text: 'Great job. It doesn\'t look like they responded, they must be unconscious. Let\'s check for pinpoint pupils. How should we do this?',
        }
    ],
};

const choice3_4: Choice = {
    text: 'Clap loudly next to the person\'s ear to see if they react',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Loud noises alone aren\'t a reliable way to check for unconsciousness and don\'t help determine if someone is experiencing a medical emergency like an overdose.',
        },
    ],
};

const action3: Action = {
    type: 'decision',
    question: 'How should you check if someone is unconscious?',
    choices: [choice3_1, choice3_2, choice3_3, choice3_4],
};

// Scene 4: Checking Pupils
const line4_1: Line = {
    name: 'NARCAT',
    text: 'Great job. It doesn\'t look like they responded, they must be unconscious. Let\'s check for pinpoint pupils. How should we do this?',
};

const choice4_1: Choice = {
    text: 'Gently lift the person\'s eyelid and check the pupil size, then shine a light in it then remove. See if their pupil changes sizes',
    nextScene: 'scene5',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: A person experiencing an opioid overdose will have very tiny pupils that do not respond to light. If their pupils are enlarged or respond to light, something else is probably going on.',
        },
        {
            name: 'NARCAT',
            text: 'Excellent. Now let\'s check for the final sign of slowed or stopped breathing. Let\'s count their breathing by listening for breath sounds and watching for chest rise and fall. How often should they be breathing?',
        }
    ],
};

const choice4_2: Choice = {
    text: 'Yell at the person and see if their eyes open normally',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Yelling doesn\'t tell you anything about their pupil size or whether opioids are involved.',
        },
    ],
};

const choice4_3: Choice = {
    text: 'Pour water on their face and look for blinking',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'This won\'t help you check their pupils and isn\'t a recommended step.',
        },
    ],
};

const choice4_4: Choice = {
    text: 'Take a picture of their eye and zoom in to guess the pupil size',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Using a light and checking directly is much more accurate and quicker in an emergency.',
        },
    ],
};

const action4: Action = {
    type: 'decision',
    question: 'How should you check for pinpoint pupils?',
    choices: [choice4_1, choice4_2, choice4_3, choice4_4],
};

// Scene 5: Checking Breathing
const line5_1: Line = {
    name: 'NARCAT',
    text: 'Excellent. Now let\'s check for the final sign of slowed or stopped breathing. Let\'s count their breathing by listening for breath sounds and watching for chest rise and fall. How often should they be breathing?',
};

const choice5_1: Choice = {
    text: 'At least 5 times per minute (1 time every 12 seconds)',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'This is considered respiratory depression. Adults normally breathe 12-20 times per minute. Breathing only 5 times per minute indicates that something is wrong, and medical attention is required.',
        },
    ],
};

const choice5_2: Choice = {
    text: 'At least 12 times per minute (1 time every 5 seconds)',
    nextScene: 'scene6',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: Adults breathe 12-20 times per minute. Breathing under 12 breaths per minute indicates that something is wrong.',
        },
        {
            name: 'NARCAT',
            text: 'Oh no! This person is taking far less than 12 breaths per minute. It looks like they have all three signs of the opioid overdose triad. What should we do next?',
        }
    ],
};

const choice5_3: Choice = {
    text: 'At least 20 times per minute (1 time every 3 seconds)',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Adults breathe 12-20 times per minute. Breathing more than 20 times per minute is not a sign of an opioid overdose but may signal that something else is wrong.',
        },
    ],
};

const choice5_4: Choice = {
    text: 'It depends on the person',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Adults breath between 12 to 20 times per minute, and breathing under this rate is a sign that something is wrong.',
        },
    ],
};

const action5: Action = {
    type: 'decision',
    question: 'What is the normal breathing rate for adults?',
    choices: [choice5_1, choice5_2, choice5_3, choice5_4],
};

// Scene 6: Administering Naloxone
const line6_1: Line = {
    name: 'NARCAT',
    text: 'Oh no! This person is taking far less than 12 breaths per minute. It looks like they have all three signs of the opioid overdose triad. What should we do next?',
};

const choice6_1: Choice = {
    text: 'Administer naloxone to the person if available',
    nextScene: 'scene7',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: Naloxone is a life-saving medication that can reverse an opioid overdose by helping the person breathe again. If someone has all three signs—unconsciousness, slowed or no breathing, and pinpoint pupils—you should give naloxone right away.',
        },
        {
            name: 'NARCAT',
            text: 'Great job administering the naloxone. Let\'s perform rescue breathing. This person isn\'t breathing on their own, so we should breathe for them. How do we do this?',
        }
    ],
};

const choice6_2: Choice = {
    text: 'Wait to see if their breathing improves on its own',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Time is critical in an overdose. Waiting could lead to brain damage or death from lack of oxygen. You need to act immediately and administer naloxone if you have it.',
        },
    ],
};

const choice6_3: Choice = {
    text: 'Give them water',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Water won\'t reverse an opioid overdose, and giving it to someone who isn\'t fully awake could cause choking. Naloxone is the only thing that can quickly reverse the effects of opioids.',
        },
    ],
};

const choice6_4: Choice = {
    text: 'Try to wake the person up',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'This won\t treat the overdose. A gentle attempt to wake them is okay, but if they\'re showing overdose signs, the priority is giving naloxone.',
        },
    ],
};

const action6: Action = {
    type: 'decision',
    question: 'What should you do when someone shows all three signs of opioid overdose?',
    choices: [choice6_1, choice6_2, choice6_3, choice6_4],
};

// Scene 7: Rescue Breathing
const line7_1: Line = {
    name: 'NARCAT',
    text: 'Great job administering the naloxone. Let\'s perform rescue breathing. This person isn\'t breathing on their own, so we should breathe for them. How do we do this?',
};

const choice7_1: Choice = {
    text: 'Cover both their mouth and their nose with your mouth and breathe quickly multiple times',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Breathing too quickly or into both their mouth and nose can lead to overinflation or choking. You only need to seal the mouth, plug the nose, and breathe once every 5 seconds.',
        },
    ],
};

const choice7_2: Choice = {
    text: 'Tilt their head down and give a big breath into their nose every second',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Tilting the head down can block their airway. Breathing every second is way too fast—it could cause harm or make it harder for them to start breathing on their own.',
        },
    ],
};

const choice7_3: Choice = {
    text: 'Tilt the person\'s chin up, plug their nose, and breathe into their mouth 1 time every 5 seconds',
    nextScene: 'scene8',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: Breathe 1 time every 5 seconds to copy the normal breathing rate for adults. Every time you breathe into their mouth, the person\'s chest should rise.',
        },
        {
            name: 'NARCAT',
            text: 'Great job providing rescue breaths. The naloxone should work in 2-3 minutes, but 3 minutes have passed, and they still aren\'t breathing on their own. What should we do next?',
        }
    ],
};

const choice7_4: Choice = {
    text: 'Skip breathing and wait for the naloxone to kick in',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Even though naloxone helps, it doesn\'t work instantly. The person may still need oxygen right away. Rescue breathing helps keep them alive while naloxone takes effect.',
        },
    ],
};

const action7: Action = {
    type: 'decision',
    question: 'How should you perform rescue breathing?',
    choices: [choice7_1, choice7_2, choice7_3, choice7_4],
};

// Scene 8: Second Dose of Naloxone
const line8_1: Line = {
    name: 'NARCAT',
    text: 'Great job providing rescue breaths. The naloxone should work in 2-3 minutes, but 3 minutes have passed, and they still aren\'t breathing on their own. What should we do next?',
};

const choice8_1: Choice = {
    text: 'Give them something sweet like juice or candy in case their blood sugar is low',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'This is not safe or helpful—especially for someone who is unconscious or not breathing. They could choke, and this won\'t reverse an opioid overdose.',
        },
    ],
};

const choice8_2: Choice = {
    text: 'Provide another dose of naloxone if available and continue rescue breathing',
    nextScene: 'scene9',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: If the first dose of naloxone is not effective, an additional dose may be needed.',
        },
        {
            name: 'NARCAT',
            text: 'Great job administering another dose of naloxone! It looks like this person is starting to breathe on their own. What should we do next?',
        }
    ],
};

const choice8_3: Choice = {
    text: 'Stop giving rescue breaths and wait to see if they wake up',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Stopping rescue breathing could lead to brain damage or death. They need oxygen until they can breathe on their own.',
        },
    ],
};

const choice8_4: Choice = {
    text: 'Stop acting and wait for emergency responders to arrive',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'There is still action you can take if emergency responders have not yet arrived.',
        },
    ],
};

const action8: Action = {
    type: 'decision',
    question: 'What should you do if naloxone hasn\'t worked after 3 minutes?',
    choices: [choice8_1, choice8_2, choice8_3, choice8_4],
};

// Scene 9: Recovery Position
const line9_1: Line = {
    name: 'NARCAT',
    text: 'Great job administering another dose of naloxone! It looks like this person is starting to breathe on their own. What should we do next?',
};

const choice9_1: Choice = {
    text: 'Nothing. You can leave the scene',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Do not leave the scene until emergency responders arrive. Once they arrive, you can let them know the actions you took while waiting for their arrival.',
        },
    ],
};

const choice9_2: Choice = {
    text: 'Continue rescue breathing',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Once the person begins breathing on their own, rescue breathing is no longer necessary.',
        },
    ],
};

const choice9_3: Choice = {
    text: 'Place the person on their left side in recovery position',
    nextScene: 'resultScene',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Explanation: Recovery position will ensure that if the person needs to throw up, they will not choke on it. Place them in recovery position and take a step back until emergency responders arrive.',
        },
        {
            name: 'NARCAT',
            text: 'Great job responding to the overdose! Now that emergency responders have arrived, we can step back and let them take it from here.',
        }
    ],
};

const choice9_4: Choice = {
    text: 'Yell and try to wake the person up',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'The person will likely wake up if the naloxone has worked to restore their breathing. Let them know they are ok and that help is on the way.',
        },
    ],
};

const action9: Action = {
    type: 'decision',
    question: 'What should you do once the person starts breathing on their own?',
    choices: [choice9_1, choice9_2, choice9_3, choice9_4],
};

// Result Scene that will trigger the results page
export const resultScene: Scene = {
    scene: 'resultScene',
    background: '/background1.png',
    characters: [],
    actions: [],
    dialogue: [],
};

export const startScene: Scene = {
    scene: 'startScene',
    background: '/background1.png',
    characters: [character1],
    actions: [action1],
    dialogue: [line1_1],
};

export const scene2: Scene = {
    scene: 'scene2',
    background: '/background1.png',
    characters: [character1],
    actions: [action2],
    dialogue: [line2_1],
};

export const scene3: Scene = {
    scene: 'scene3',
    background: '/background1.png',
    characters: [character1],
    actions: [action3],
    dialogue: [line3_1],
};

export const scene4: Scene = {
    scene: 'scene4',
    background: '/background1.png',
    characters: [character1],
    actions: [action4],
    dialogue: [line4_1],
};

export const scene5: Scene = {
    scene: 'scene5',
    background: '/background1.png',
    characters: [character1],
    actions: [action5],
    dialogue: [line5_1],
};

export const scene6: Scene = {
    scene: 'scene6',
    background: '/background1.png',
    characters: [character1],
    actions: [action6],
    dialogue: [line6_1],
};

export const scene7: Scene = {
    scene: 'scene7',
    background: '/background1.png',
    characters: [character1],
    actions: [action7],
    dialogue: [line7_1],
};

export const scene8: Scene = {
    scene: 'scene8',
    background: '/background1.png',
    characters: [character1],
    actions: [action8],
    dialogue: [line8_1],
};

export const scene9: Scene = {
    scene: 'scene9',
    background: '/background1.png',
    characters: [character1],
    actions: [action9],
    dialogue: [line9_1],
};

export const game: Game = new Map<string, Scene>([
    ['startScene', startScene],
    ['scene2', scene2],
    ['scene3', scene3],
    ['scene4', scene4],
    ['scene5', scene5],
    ['scene6', scene6],
    ['scene7', scene7],
    ['scene8', scene8],
    ['scene9', scene9],
    ['resultScene', resultScene],
]);

