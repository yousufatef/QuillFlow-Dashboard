import { useSearchParams } from "react-router-dom";
import MainHeader from "@/components/layout/MainHeader";
import { CustomSearchBar } from "@/components/shared/customs";
import { useNavigate } from "react-router-dom";
import BlogCard from "./_components/BlogCard";
import { blogsList } from "./_components/dummyData";
import CustomSelectorFilter from "@/components/shared/customs/CustomFilter";
import { STATUS_ITEMS } from "@/constants/blogs";

const BlogsPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchValue = searchParams.get("search") ?? "";

    const updateParam = (key: string, value: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value && value !== "all") {
                next.set(key, value);
            } else {
                next.delete(key);
            }
            return next;
        });
    };


    const handleCreateBlog = () => {
        navigate("/cms/blogs/create");
    };

    return (
        <div className="container">
            <MainHeader
                title="Blog Details"
                onPrimaryClick={handleCreateBlog}
                primaryLabel="Create Blog"
            />
            <div className="flex items-center gap-3 mt-6">
                <CustomSearchBar
                    placeholder="Search Blogs"
                    wrapperClassName="max-w-sm"
                    defaultValue={searchValue}
                    onValueChange={(val) => updateParam("search", val)}
                />
                <CustomSelectorFilter
                    items={STATUS_ITEMS}
                    placeholder="All categories"
                    fildName="status"
                    wrapperClassName="min-h-12 rounded-sm cursor-pointer type-body-md shadow-[0px_4px_20px_0px_#0D3B2E12]"

                />
            </div>

            {blogsList.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {blogsList.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            {...blog}
                            onMenuClick={(id) =>
                                console.log("Menu clicked for blog:", id)
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-16 flex flex-col items-center justify-center gap-2 text-center text-gray-400">
                    <p className="text-lg font-semibold text-gray-500">
                        No blogs found
                    </p>
                    <p className="text-sm">
                        Try adjusting your search or filter.
                    </p>
                </div>
            )}
        </div>
    );
};

export default BlogsPage;