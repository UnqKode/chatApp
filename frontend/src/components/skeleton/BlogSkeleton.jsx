const BlogSkeleton = () => {
  const skeletonBlogs = Array(6).fill(null); // Number of skeletons to show

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonBlogs.map((_, idx) => (
        <div key={idx} className="flex w-full flex-col gap-4">
          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-4 w-32"></div>
            </div>
          </div>

          {/* Blog title */}
          <div className="skeleton h-6 w-3/4"></div>

          {/* Blog content */}
          <div className="skeleton h-32 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default BlogSkeleton;
