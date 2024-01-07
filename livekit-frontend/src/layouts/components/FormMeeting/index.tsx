import { useCreateRoomStore } from '@/hooks/useAPIStore';
import useAxios from '@/hooks/useAxios';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormProps {
  onSubmit: (formFields: FormFields) => void;
}

interface FormFields {
  roomName: string;
  duration: number;
}

const ReusableForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [formFields, setFormFields] = useState<FormFields>({
    roomName: '',
    duration: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formFields);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-4 p-6 bg-white rounded-md shadow-md"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="roomName"
        >
          Room Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="roomName"
          type="text"
          placeholder="Room Name"
          name="roomName"
          value={formFields.roomName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="duration"
        >
          Duration
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="duration"
          type="number"
          placeholder="Duration in mins"
          name="duration"
          value={formFields.duration}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ReusableForm;
