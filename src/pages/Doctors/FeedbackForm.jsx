import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import {useParams} from 'react-router-dom'
import { BASE_URL } from '../../config'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);   
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const {id} = useParams()

  const handleSubmitReview = async(e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating,
          reviewText
        })
      })
      
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned invalid response');
      }
      
      const data = await res.json()
      if(res.ok){
        toast.success(data.message)
        // Reset form
        setRating(0);
        setReviewText('');
      } else {
        toast.error(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <form action="">
      <div>
        <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
          How would you rate your experience?
        </h3>

        <div>
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <button 
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? 'text-yellowColor' 
                    : 'text-gray-400'
                } bg-transparent border-none outline-none cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setRating(0);
                  setHover(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className='mt-[30px]'>
         <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
          share your feedback about our service
        </h3>
        <textarea
          className='w-full p-4 border border-gray-300 rounded resize-none h-[150px] focus:border-irisBlueColor outline-none'
          rows="5"
          placeholder='Write your feedback here...'
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      
      <button 
        type='submit' 
        onClick={handleSubmitReview} 
        className='btn'
        disabled={loading}
      >
        {loading ? <HashLoader size={25} color="#fff" /> : 'Submit Feedback'}
      </button>

    </form>
  )
}

export default FeedbackForm