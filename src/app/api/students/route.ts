import { NextRequest, NextResponse } from 'next/server';
import firebase_app from '@/firebase/config';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);
