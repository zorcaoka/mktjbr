import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAdminStore } from '../store';

export default function CustomPage() {
  const { slug } = useParams<{ slug: string }>();
  const { customPages } = useAdminStore();

  const page = customPages.find((p) => p.slug === slug);

  if (!page) {
    return <Navigate to="/" />;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: page.htmlContent }}
      className="custom-page"
    />
  );
}