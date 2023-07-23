"use client";

import qs from "query-string"
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import Filter from "./filters";

interface MobileFiltersProp{
    name: string;
    data: string[];
}

const MobileFilters: React.FC<MobileFiltersProp> = ({
    name,
    data
}) =>{

    const [open,setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const selectedValue = '';//searchParams.get(valueKey);

    const onClick=(key:string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            filter: key
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true});

        router.push(url);
    }

    return (
        <>
            <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
                Filters
                <Plus size={20}/>
            </Button>

            <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
                {/* Background */}
                <div className="fixed inset-0 bg-black bg-opacity-25"/>

                {/* Dialog position */}
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                        {/* Close Button */}
                        <div className="flex items-center justify-end px-4">
                            <IconButton icon={<X size={25}/>} onClick={onClose} />
                        </div>

                        {/* Render the filters */}
                        <div className="p-4">
                            <Filter
                                name="Filters"
                                data={['doll','book','pink','rainbow']}
                            />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}

export default MobileFilters;