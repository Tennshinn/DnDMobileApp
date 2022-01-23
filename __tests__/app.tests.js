import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/Home';
import PackageEditor from '../screens/PackageEditor';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

test('home screen contains navigation buttons', () => {
    const allQuestions = ['q1', 'q2'];
    const mockFn = jest.fn();

    const { getByText } = render(
        <HomeScreen />
    );

    const selectCharacter = getByText('SELECT CHARACTER');
    const uploadCharacter = getByText('UPLOAD PACKAGE');

    expect(selectCharacter).toStrictEqual(expect.anything());
    expect(uploadCharacter).toStrictEqual(expect.anything());
});

test('alert on empty package name', async () => {
    const allQuestions = ['q1', 'q2'];
    const mockFn = jest.fn();

    const { getByText } = render(
        <PackageEditor />
    );

    // sample name taken from the repository 
    const saveButton = getByText('Save');

    fireEvent.press(saveButton);

    expect(Alert.alert).toHaveBeenCalledWith("Oups :(", "Please enter name", [{ text: "Got it!"}]);
});