import CompanyName from "./ui/company-name";

const Footer = () => {
    return (
        <footer className="bg-white border-t">
            <div className="mx-auto py-10">
                <p className="text-center text-xstext-black">
                    &copy; 2023 <CompanyName/>, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;