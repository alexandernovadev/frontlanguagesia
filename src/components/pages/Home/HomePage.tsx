import { useState } from "react";
import { useForm } from "react-hook-form";
import { SlidersHorizontal } from "lucide-react";

import { CardList } from "./CardList";
import { Modal } from "../../shared/Modal";
import { FormFilters } from "./FormFilters";
import { MainLayout } from "../../shared/Layouts/MainLayout";
import Input from "../../ui/Input";

interface FormData {
  searchQuery: string;
}

export default function HomePage() {
  const { handleSubmit, control } = useForm<FormData>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const onSubmit = () => {
  };

  return (
    <MainLayout>
      <div className="sticky top-0 z-10 bg-gradient-to-b from-black-800 to-transparent p-4">
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              name="searchQuery"
              control={control}
              placeholder="Search..."
            />
          </form>

          <button
            onClick={toggleModal}
            className="bg-customBlack-200 p-2 rounded-lg"
          >
            <SlidersHorizontal className="text-green-700 w-5 h-5" />
          </button>
        </div>
      </div>
      <main className="flex-1 p-4 overflow-auto h-full">
        <CardList />
      </main>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <FormFilters />
      </Modal>
    </MainLayout>
  );
}
