import os

import cv2
import mediapipe as mp
import numpy as np
import csv
import copy
import argparse
import itertools

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands
def update_csv(label,landmark_list):
    # print(label)
    csv_path = 'data.csv'
    with open(csv_path, 'a', newline="") as f:
        writer = csv.writer(f)
        writer.writerow([label, *landmark_list])
    return
def calc_landmark_list(image, landmarks):
    image_width, image_height = image.shape[1], image.shape[0]

    landmark_point = []
    landmark_point_mirrorx = []
    landmark_point_mirrory = []

    # Keypoint
    for _, landmark in enumerate(landmarks.landmark):
        landmark_x = min(int(landmark.x * image_width), image_width - 1)
        landmark_y = min(int(landmark.y * image_height), image_height - 1)

        # landmark_z = landmark.z

        landmark_point.append([landmark_x, landmark_y])
        landmark_point_mirrorx.append([-landmark_x, landmark_y])
        landmark_point_mirrory.append([landmark_x, -landmark_y])


    return landmark_point, landmark_point_mirrorx, landmark_point_mirrory
def preprocess_landmark(landmark_list):
    temp_landmark_list = copy.deepcopy(landmark_list)

    # Convert to relative coordinates
    base_x, base_y = 0, 0
    for index, landmark_point in enumerate(temp_landmark_list):
        if index == 0:
            base_x, base_y = landmark_point[0], landmark_point[1]

        temp_landmark_list[index][0] = temp_landmark_list[index][0] - base_x
        temp_landmark_list[index][1] = temp_landmark_list[index][1] - base_y

    # Convert to a one-dimensional list
    temp_landmark_list = list(
        itertools.chain.from_iterable(temp_landmark_list))

    # Normalization
    max_value = max(list(map(abs, temp_landmark_list)))

    def normalize_(n):
        return n / max_value

    temp_landmark_list = list(map(normalize_, temp_landmark_list))

    return temp_landmark_list

# For static images:
IMAGE_FILES = []
classes=['rock','paper','scissors']
with mp_hands.Hands(
        static_image_mode=True,
        max_num_hands=1,
        min_detection_confidence=0.1) as hands:
    count=[0]*3
    for i,c in enumerate(classes):
        directory='/home/dtech/Documents/git/vision-rps/dataset/train/'+c
        for filename in os.listdir(directory):
            print(count)
            file = os.path.join(directory, filename)
            # print(file)

            image=cv2.imread(file)
            results = hands.process(image)

            # Draw the hand annotations on the image.
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            debug_image = copy.deepcopy(image)

            if results.multi_hand_landmarks:
                count[i] += 1
                for hand_landmarks in results.multi_hand_landmarks:
                    landmark,lmx,lmy = calc_landmark_list(debug_image, hand_landmarks)
                    landmark, lmx, lmy=preprocess_landmark(landmark),preprocess_landmark(lmx),preprocess_landmark(lmy)


                    landmark = np.array(landmark)
                    lmx = np.array(lmx)
                    lmy = np.array(lmy)

                    update_csv(i, landmark)
                    update_csv(i, lmx)
                    update_csv(i, lmy)

    print(count)
