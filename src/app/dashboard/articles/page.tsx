import { Suspense } from "react";
import ArticleView from "@/features/articles";

export default function index() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="px-4 sm:px-36 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-4">
            <Suspense fallback={<div>Loading categories...</div>}>
              <ArticleView />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
