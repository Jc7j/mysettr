"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 border-b border-gray-200 p-4 dark:border-gray-700">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl leading-7 font-bold tracking-tight text-gray-900 sm:truncate sm:text-3xl dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="mt-4 flex shrink-0 sm:mt-0 sm:ml-4">{actions}</div>
        )}
      </div>
    </div>
  );
}
