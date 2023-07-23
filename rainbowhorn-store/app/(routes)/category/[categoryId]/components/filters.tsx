"use client";

import qs from "query-string"
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterProp{
    name: string;
    data: string[];
}

const Filter: React.FC<FilterProp> = ({
    name,
    data
}) =>{

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
        <div className="mb-8">
            <h3 className="text-lg font-smibold">
                {name}
            </h3>
            <hr className="my-4"/>
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div className="flex items-center">
                        <Button
                            className={cn(
                                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-200",
                                selectedValue === filter && "bg-black text-white"                                
                            )}
                            onClick={() => onClick(filter)}
                            >
                            {filter}                            
                        </Button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Filter;