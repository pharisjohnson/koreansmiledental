CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) can submit a booking request.
CREATE POLICY "Anyone can submit a booking"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read/update/delete. Clinic staff will view bookings via the Cloud dashboard.
CREATE INDEX idx_bookings_created_at ON public.bookings (created_at DESC);