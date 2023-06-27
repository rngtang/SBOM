class User < ApplicationRecord
    has_many :sboms, dependent: :nullify
end
