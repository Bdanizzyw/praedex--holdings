// Create a multi-field form for listing a property: title, price, type select, location text (placeholder), image upload (placeholder), submit button.
// No backend yet—form does not need to submit anywhere. Use accessible labels and Tailwind.

'use client'

import { FormEvent, useState } from 'react'

export default function ListPropertyPage() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: 'apartment',
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for listing! Our team will review your property.')
    setFormData({ title: '', price: '', type: 'apartment', location: '' })
  }

  return (
    <main>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">List Your Property</h1>
          <p className="text-gray-600 mb-8">
            Reach thousands of investors by listing your property with Praedex Holdings
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-bold mb-2 text-gray-700">
                Property Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Luxury Downtown Apartment"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-bold mb-2 text-gray-700">
                Price (USD) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="e.g., 850000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-bold mb-2 text-gray-700">
                Property Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="townhouse">Townhouse</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-bold mb-2 text-gray-700">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Downtown, 2.5 km from city center"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Image Upload Placeholder */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Property Images
              </label>
              <div className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
                <span className="text-3xl mb-2">📸</span>
                <p className="text-gray-600">Click to upload images (Coming soon)</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              List Property
            </button>

            <p className="text-sm text-gray-600 text-center">
              * Required fields. Our team will review your submission within 24 hours.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
