import CategoryDataView from "@/features/categories";
import { Suspense } from "react";

export default function CategoriesView() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="px-4 md:px-36 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-4">
            <div title="Featured Articles">
              <h2 className="text-[#0c151d] text-xl font-semibold leading-tight tracking-[-0.015em] mb-4">
                Categories
              </h2>

              <Suspense fallback={<div>Loading categories...</div>}>
                <CategoryDataView />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
