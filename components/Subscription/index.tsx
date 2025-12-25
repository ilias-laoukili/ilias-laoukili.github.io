import Image from "@/components/Image";
import Button from "../Button";

const Subscription = () => {
    return (
        <div className="pt150">
            <div className="container" id="contact">
                <div className="relative flex items-end min-h-[39.69rem] px-12 py-18 rounded-[2rem] overflow-hidden after:absolute after:inset-0 after:bg-black/60 xl:min-h-[34rem] xl:py-12 md:px-5">
                    <Image
                        className="object-cover md:object-[70%50%]"
                        src="/images/bg-cta.jpg"
                        fill
                        alt=""
                    />
                    <div className="relative z-3 flex lg:block">
                        <div className="shrink-0 w-[35.625rem] text-h1 text-w-50 2xl:w-[30rem] xl:w-[24rem] lg:w-full lg:mb-4">
                            Stay updated on my latest projects and achievements
                        </div>
                        <div className="grow pl-30 2xl:pl-12 lg:pl-0">
                            <div className="mb-8 text-w-50">
                                Contact me and receive updates about my latest projects, 
                                research work, and new blog posts about AI, cybersecurity, 
                                and software development. Join me on this journey of 
                                continuous learning and innovation.
                            </div>
                            <Button title="Contact Me" light arrow onClick={() => window.open('mailto:ilias.laoukili@proton.me', '_blank')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
